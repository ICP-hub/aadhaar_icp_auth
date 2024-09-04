import React, { useEffect, useState } from 'react';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from '../../declarations/hello_backend'; // Adjust the path as needed

// The Verification component takes aadhaarNumber as a prop
const Verification = ({ aadhaarNumber }) => {
  // State variables to store the public key, principal ID, and response message
  const [publicKey, setPublicKey] = useState([]);
  const [principalId, setPrincipalId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    // Function to generate an identity and authenticate the user
    const generateIdentityAndAuthenticate = async () => {
      try {
        // Step 1: Combine Aadhaar number with a fixed number from the environment variable
        const fixedNumber = process.env.REACT_APP_FIXED_NUMBER; // Load fixed number from environment variables
        const encoder = new TextEncoder();
        const combinedString = `${aadhaarNumber}-${fixedNumber}`; // Combine Aadhaar number and fixed number
        const combinedBuffer = encoder.encode(combinedString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', combinedBuffer); // Hash the combined string

        // Convert the hash to a Uint8Array and ensure it's 32 bytes
        let seed = new Uint8Array(hashBuffer);
        if (seed.length > 32) {
          seed = seed.slice(0, 32); // Truncate if longer than 32 bytes
        } else if (seed.length < 32) {
          const padding = new Uint8Array(32 - seed.length); // Pad if shorter than 32 bytes
          seed = new Uint8Array([...seed, ...padding]);
        }

        // Step 2: Encrypt the seed using the Web Crypto API
        const encryptedSeed = await encryptSeed(seed);

        // Step 3: Decrypt the seed to use it for generating the identity
        const decryptedSeed = await decryptSeed(encryptedSeed);

        // Step 4: Generate the identity using the decrypted seed
        const identity = Ed25519KeyIdentity.generate(decryptedSeed);
        const principal = identity.getPrincipal(); // Get the principal ID

        // Get the public key
        const publicKey = identity.getPublicKey().toDer(); // Get public key in DER format
        const publicKeyArray = Array.from(publicKey); // Convert to array for easier display

        // Store the principal ID in session storage and set state
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

    // Function to encrypt the seed using AES-GCM encryption
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
        key: await window.crypto.subtle.exportKey('jwk', key), // Export the key for storage
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encryptedSeed)), // Convert encrypted seed to array
      };
    };

    // Function to decrypt the encrypted seed using AES-GCM encryption
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
        new Uint8Array(encryptedSeed.data) // Decrypt the data back to Uint8Array
      );

      return new Uint8Array(decryptedSeed); // Return the decrypted seed
    };

    // Function to authenticate using the identity and call a backend canister method
    const authenticateAndCallBackend = async (identity) => {
      try {
        const agent = new HttpAgent({ identity }); // Create an HttpAgent with the identity

        // Fetch root key in development mode
        if (process.env.NODE_ENV === 'development') {
          await agent.fetchRootKey();
        }

        const backendActor = Actor.createActor(backend_idl, {
          agent,
          canisterId: backend_id,
        });

        // Call the backend canister's greet method and log the response
        const response = await backendActor.greet();
        console.log('Greet response:', response);

        setResponseMessage(`Authenticated call successful: ${response}`);
      } catch (error) {
        console.error('Error calling greet function:', error);
        setResponseMessage(`Error calling greet function: ${error.message}`);
      }
    };

    // Trigger identity generation and authentication when component mounts
    generateIdentityAndAuthenticate();
  }, [aadhaarNumber]);

  // Helper function to convert Uint8Array to a comma-separated string for display
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

export default Verification;
