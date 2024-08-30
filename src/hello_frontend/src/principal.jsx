import React, { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';

const PrincipalVerificationComponent = () => {
    const [isMatching, setIsMatching] = useState(null); // null, true, or false
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

    // useEffect(() => {
    //     const verifyPrincipal = async () => {
    //         const authClient = await AuthClient.create();

    //         // Wait for the user to be authenticated
    //         authClient.isAuthenticated().then((authenticated) => {
    //             setIsAuthenticated(authenticated);
    //             if (authenticated) {
    //                 const identity = authClient.getIdentity();
    //                 const loggedInPrincipalId = identity.getPrincipal().toText();

    //                 // Store the logged-in principal ID in localStorage
    //                 localStorage.setItem('loggedInPrincipalId', loggedInPrincipalId);

    //                 const generatedPrincipalId = localStorage.getItem('generatedPrincipalId');

    //                 if (loggedInPrincipalId === generatedPrincipalId) {
    //                     setIsMatching(true);
    //                 } else {
    //                     setIsMatching(false);
    //                 }
    //             }
    //         });
    //     };

    //     verifyPrincipal();
    // }, []);

    // return (
    //     <div>
    //         {isAuthenticated === false && <p>Authenticating...</p>}
    //         {isMatching === null && isAuthenticated && <p>Verifying principal...</p>}
    //         {isMatching === true && <p>Principal verified! The logged-in principal matches the generated principal.</p>}
    //         {isMatching === false && <p>Principal mismatch! The logged-in principal does not match the generated principal.</p>}
    //     </div>
    // );
};

export default PrincipalVerificationComponent;
