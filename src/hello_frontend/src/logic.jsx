import { useState } from 'react';

const useAdharLogic = () => {
  const [authToken, setAuthToken] = useState(''); // Replace with actual auth token
  const [refId, setRefId] = useState('');
  const [otp, setOtp] = useState('');
  const [aadharno, setAadharno] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Fetch request for generating the auth token
  const generateAuthToken = () => {
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
        setAuthToken(data.auth_token); // Set the auth token from response
        console.log('Auth Token:', data.auth_token);
      })
      .catch(error => console.error('Error:', error));
  };

  // Handling the request for Aadhaar number OTP
  const sendOtp = (e) => {
    e.preventDefault();
    const url = 'https://api.sandbox.co.in/kyc/aadhaar/okyc/otp';

    const data = JSON.stringify({
      aadhaar_number: aadharno
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
    .then(result => {
      console.log('OTP Sent Result:', result);
      setRefId(result.ref_id); // Store ref_id for OTP verification
      setOtpSent(true); // Show the OTP input form
    })
    .catch(error => console.error('Error sending OTP:', error));
  };

  // Function to handle OTP verification
  const verifyOtp = (e) => {
    e.preventDefault();
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

  return {
    aadharno,
    setAadharno,
    otp,
    setOtp,
    otpSent,
    sendOtp,
    verifyOtp
  };
};

export default useAdharLogic;
