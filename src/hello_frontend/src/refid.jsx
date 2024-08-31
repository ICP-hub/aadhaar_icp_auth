import React, { useEffect, useState } from 'react';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from '../../declarations/hello_backend'; // Adjust the path as needed

const RefIdComponent = ({ aadhaarNumber }) => {
  const [publicKey, setPublicKey] = useState([]);
  const [principalId, setPrincipalId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Hardcoded UID token - Replace this with the API call once available
  // const uidToken = '2fd4e1cc6-7a2f-47e1-8c4a-3e8b4db0a8d7';

  useEffect(() => {
    const generateIdentityAndAuthenticate = async () => {
      try {
        // Step 1: Combine Aadhaar number, the hardcoded UID token, and the fixed number from environment variable
        const fixedNumber = process.env.REACT_APP_FIXED_NUMBER; // Load from environment variable
        const encoder = new TextEncoder();
        const combinedString = `${aadhaarNumber}-${fixedNumber}`;
        const combinedBuffer = encoder.encode(combinedString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', combinedBuffer);

        // Convert the hash to a Uint8Array and ensure it's 32 bytes
        let seed = new Uint8Array(hashBuffer);
        if (seed.length > 32) {
          seed = seed.slice(0, 32);
        } else if (seed.length < 32) {
          const padding = new Uint8Array(32 - seed.length);
          seed = new Uint8Array([...seed, ...padding]);
        }

        // Step 2: Encrypt the seed using the Web Crypto API
        const encryptedSeed = await encryptSeed(seed);

        // Step 3: Decrypt the seed to use it for generating the identity
        const decryptedSeed = await decryptSeed(encryptedSeed);

        // Step 4: Generate the identity using the decrypted seed
        const identity = Ed25519KeyIdentity.generate(decryptedSeed);
        const principal = identity.getPrincipal();

        // Get the public key
        const publicKey = identity.getPublicKey().toDer();
        const publicKeyArray = Array.from(publicKey);

        // Only store the necessary information, avoiding sensitive data storage
        sessionStorage.setItem('principalId', principal.toText());
        setPublicKey(publicKeyArray);
        setPrincipalId(principal.toText());

        // Authenticate and call the backend canister
        await authenticateAndCallBackend(identity);
      } catch (error) {
        console.error('Error generating identity or authenticating:', error);
        setResponseMessage(`Error: ${error.message}`);
      }
    };

    const encryptSeed = async (seed) => {
      const key = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );

      const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
      const encryptedSeed = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
        },
        key,
        seed
      );

      return {
        key: await window.crypto.subtle.exportKey('jwk', key),
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encryptedSeed)),
      };
    };

    const decryptSeed = async (encryptedSeed) => {
      const key = await window.crypto.subtle.importKey(
        'jwk',
        encryptedSeed.key,
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["decrypt"]
      );

      const iv = new Uint8Array(encryptedSeed.iv); // Initialization vector
      const decryptedSeed = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
        },
        key,
        new Uint8Array(encryptedSeed.data)
      );

      return new Uint8Array(decryptedSeed);
    };

    const authenticateAndCallBackend = async (identity) => {
      try {
        const agent = new HttpAgent({ identity });

        // For local development, you might need to fetch the root key
        if (process.env.NODE_ENV === 'development') {
          await agent.fetchRootKey();
        }

        const backendActor = Actor.createActor(backend_idl, {
          agent,
          canisterId: backend_id,
        });

        const response = await backendActor.greet();
        console.log('Greet response:', response);

        setResponseMessage(`Authenticated call successful: ${response}`);
      } catch (error) {
        console.error('Error calling greet function:', error);
        setResponseMessage(`Error calling greet function: ${error.message}`);
      }
    };

    generateIdentityAndAuthenticate();
  }, [aadhaarNumber]);

  const Uint8ArrayToCommaSeparated = (uint8Array) => {
    return uint8Array.join(', ');
  };

  return (
    <div>
      <h1>Identity and Authentication</h1>
      <p>Public Key (Uint8Array): {Uint8ArrayToCommaSeparated(publicKey)}</p>
      <p>Principal ID: {principalId}</p>
      <p>Response from backend canister: {responseMessage}</p>
    </div>
  );
};

export default RefIdComponent;