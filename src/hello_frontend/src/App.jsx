import React, { useState, useEffect } from 'react';

function Adhar() {
  const [authToken, setAuthToken] = useState('');

  // Generate auth token on component mount
  useEffect(() => {
    const url = 'https://api.sandbox.co.in/authenticate';

    const headers = {
      'accept': 'application/json',
      'x-api-key': 'key_Live_xQp3KX7ZJLYSs9hij7vZ8xu9g5rvc1',
      'x-api-secret': 'secret_Live_MfshrIYD9quRCokmUgyxdPEGGThNWqtM',
      'x-api-version': '1.0'
    };

    fetch(url, {
      method: 'POST',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        console.log('Auth Token:', data.auth_token);
        setAuthToken(data.auth_token); // Save the auth token to state
      })
      .catch(error => {
        console.error('Error fetching auth token:', error);
      });
  }, []);

  // Handle the request for Aadhar number
  const handleAadharRequest = () => {
    if (new URLSearchParams(window.location.search).has('sendotp')) {
      const aadharno = document.querySelector('input[name="aadhaar_no"]').value;
      const url = 'https://api.sandbox.co.in/kyc/aadhaar/okyc/otp';

      const data = JSON.stringify({
        aadhaar_number: aadharno
      });

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}` // Use the auth token from state
      };

      fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
      })
      .then(response => response.json())
      .then(result => console.log('OTP Response:', result))
      .catch(error => console.error('Error sending OTP:', error));
    }
  };
  const verifyOtp = () => {
    const url = 'https://api.sandbox.co.in/kyc/aadhaar/okyc/otp/verify';

    const data = JSON.stringify({
      ref_id: refId,
      otp: otp
    });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // Use the auth token
    };

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: data
    })
    .then(response => response.json())
    .then(result => console.log('Verification Result:', result))
    .catch(error => console.error('Error verifying OTP:', error));
  };
  // Call the function when needed (e.g., on form submission)
  useEffect(() => {
    handleAadharRequest();
  }, [authToken]); // Re-run when authToken is updated

  return (
    <div>
      {/* Your form goes here */}
      <form>
        <input type="text" name="aadhaar_no" placeholder="Enter Aadhaar Number" />
        <button type="button" onClick={handleAadharRequest}>Send OTP</button>
      </form>
    </div>
  );
}

export default Adhar;
