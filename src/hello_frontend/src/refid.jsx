import React, { useEffect, useState } from 'react';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as backend_idl, canisterId as backend_id } from '../../declarations/hello_backend'; // Adjust the path as needed

const RefIdComponent = () => {
  const [publicKey, setPublicKey] = useState([]);
  const [privateKey, setPrivateKey] = useState([]);
  const [principalId, setPrincipalId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const refId = '12556'; // Hardcoded refId

  useEffect(() => {
    const generateIdentityAndAuthenticate = async () => {
      try {
        // Generate the identity
        const seed = new TextEncoder().encode(refId.padEnd(32, '0')).slice(0, 32);
        const identity = Ed25519KeyIdentity.generate(seed);
        const principal = identity.getPrincipal();

        // Get the public and private keys
        const publicKey = identity.getPublicKey().toDer();
        const privateKey = identity.getKeyPair().secretKey;

        // Convert keys to arrays for display and storage
        const publicKeyArray = Array.from(publicKey);
        const privateKeyArray = Array.from(privateKey);

        // Store the identity details in localStorage
        localStorage.setItem('identity', JSON.stringify({
          principalId: principal.toText(),
          publicKey: publicKeyArray,
          privateKey: privateKeyArray,
        }));

        // Update state
        setPublicKey(publicKeyArray);
        setPrivateKey(privateKeyArray);
        setPrincipalId(principal.toText());

        // Authenticate and call the backend canister
        await authenticateAndCallBackend(identity);
      } catch (error) {
        console.error('Error generating identity or authenticating:', error);
        setResponseMessage(`Error: ${error.message}`);
      }
    };

    const authenticateAndCallBackend = async (identity) => {
      try {
        const agent = new HttpAgent({ identity });

        // For local development, you might need to fetch the root key
        if (process.env.NODE_ENV === 'development') {
          await agent.fetchRootKey();
        }

        // Create an actor to interact with the backend canister
        const backendActor = Actor.createActor(backend_idl, {
          agent,
          canisterId: backend_id,
        });

        // Call the greet function from the backend canister
        const response = await backendActor.greet(); // Call greet function
        console.log('Greet response:', response);

        // Set the response (principal) to the state
        setResponseMessage(`Authenticated call successful: ${response}`);
      } catch (error) {
        console.error('Error calling greet function:', error);
        setResponseMessage(`Error calling greet function: ${error.message}`);
      }
    };

    generateIdentityAndAuthenticate();
  }, [refId]);

  const Uint8ArrayToCommaSeparated = (uint8Array) => {
    return uint8Array.join(', ');
  };

  return (
    <div>
      <h1>Identity and Authentication</h1>
      <p>Public Key (Uint8Array): {Uint8ArrayToCommaSeparated(publicKey)}</p>
      <p>Private Key (Uint8Array): {Uint8ArrayToCommaSeparated(privateKey)}</p>
      <p>Principal ID: {principalId}</p>
      <p>Response from backend canister: {responseMessage}</p>
    </div>
  );
};

export default RefIdComponent;
