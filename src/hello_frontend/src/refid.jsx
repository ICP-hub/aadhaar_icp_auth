import React, { useEffect, useState } from 'react';
import nacl from 'tweetnacl';
import { Principal } from '@dfinity/principal';
import { Ed25519KeyIdentity } from '@dfinity/identity';
const RefIdComponent = () => {
    const [publicKey, setPublicKey] = useState('');
    const [privateKeyStr, setPrivateKeyStr] = useState('');
    const [principalId, setPrincipalId] = useState('');
    const [publicKeyBigInt, setPublicKeyBigInt] = useState('');
    const refId = '123456'; // Hardcoded refId

    useEffect(() => {
        const generateKeyPairAndPrincipal = () => {
            // Use the refId as a seed for generating the key pair
            const seed = new TextEncoder().encode(refId.padEnd(32, '0')).slice(0, 32); // Ensure 32 bytes for seed
           console.log(seed);
          
            // Generate identity using the Ed25519 algorithm
            
            const identity = Ed25519KeyIdentity.generate(seed);
            
            const privateKey = identity.getKeyPair().secretKey;
            const publicKey = identity.getPublicKey();
            // Encrypt the private key using AES-256-CBC
            //const encryptionKey = crypto.randomBytes(32); // AES key size: 256 bits (32 bytes)
            // const keyPair = nacl.sign.keyPair.fromSeed(seed);
            // const privateKey = keyPair.secretKey;
            // const publicKey = keyPair.publicKey;

            // // Convert the keys to hex strings for easier viewing
            // const privateKeyHex = Uint8ArrayToHex(privateKey);
            // const publicKeyHex = Uint8ArrayToHex(publicKey);

            // // Convert the public key to a BigInt
            // const publicKeyBigInt = Uint8ArrayToBigInt(publicKey);

            // // Convert private key to base64 string
            // const privateKeyStr = Uint8ArrayToBase64(privateKey);

            // // Set the keys and publicKeyBigInt in the state
            // setPrivateKeyStr(privateKeyStr);
            // setPublicKey(publicKeyHex);
            // setPublicKeyBigInt(publicKeyBigInt.toString());

            // // Generate the Principal ID from the public key
            // const principalId = Principal.selfAuthenticating(publicKey).toText();
            // setPrincipalId(principalId);

            // Log the keys and principal ID to the console
            // console.log('Private Key (Base64):', privateKeyStr);
             console.log('Public Key ', publicKey.toDer());
             console.log('Public Key ', privateKey);
             console.log('identity Key ', identity.getPrincipal().toString());
            // console.log('Public Key (BigInt):', publicKeyBigInt.toString());
            // console.log('Principal ID:', principalId);
        };

        generateKeyPairAndPrincipal();
    }, [refId]);

    const Uint8ArrayToHex = (uint8Array) => {
        return Array.from(uint8Array)
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
    };

    const Uint8ArrayToBigInt = (uint8Array) => {
        let bigIntValue = BigInt(0);
        for (let i = 0; i < uint8Array.length; i++) {
            bigIntValue = (bigIntValue << BigInt(8)) | BigInt(uint8Array[i]);
        }
        return bigIntValue;
    };

    const Uint8ArrayToBase64 = (uint8Array) => {
        // Convert Uint8Array to base64 string
        const binaryString = Array.from(uint8Array)
            .map(byte => String.fromCharCode(byte))
            .join('');
        return window.btoa(binaryString);
    };

    return (
        <div>
            <h1>Key Pair and Principal ID Generator</h1>
            <p>Public Key (Hex): {publicKey}</p>
            <p>Private Key (Base64): {privateKeyStr}</p>
            <p>Principal ID: {principalId}</p>
            <p>Public Key (BigInt): {publicKeyBigInt}</p>
            <p>Check the console for the details.</p>
            {/* In a real scenario, you should not display the private key publicly. */}
        </div>
    );
};

export default RefIdComponent;
