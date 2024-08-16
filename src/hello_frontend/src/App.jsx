import React, { useState } from 'react';
import AadhaarInputCard from './AadharUI';
import OtpInputCard from './otp';
import AadhaarInfoCard from './info';

const AdharUI = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [showOtpCard, setShowOtpCard] = useState(false);
  const [showAadhaarInfo, setShowAadhaarInfo] = useState(false);
  const [otp, setOtp] = useState('');

  const handleAadhaarChange = (e) => {
    setAadhaarNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const validateAadhaar = () => {
    const aadhaarPattern = /^[2-9]{1}[0-9]{11}$/; // Aadhaar should be 12 digits starting from 2-9
    return aadhaarPattern.test(aadhaarNumber);
  };

  const handleOtpRequest = () => {
    if (validateAadhaar()) {
      setShowOtpCard(true); // Display OTP input card
    } else {
      alert('Please enter a valid 12-digit Aadhaar number.');
    }
  };

  const handleVerifyOtp = () => {
    const hardcodedOtp = '123456'; // Hardcoded OTP for example
    if (otp === hardcodedOtp) {
      setShowOtpCard(false);
      setShowAadhaarInfo(true);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="container">
      {!showOtpCard && !showAadhaarInfo && (
        <AadhaarInputCard
          handleAadhaarChange={handleAadhaarChange}
          handleOtpRequest={handleOtpRequest}
        />
      )}
      {showOtpCard && (
        <OtpInputCard
          handleOtpChange={handleOtpChange}
          handleVerifyOtp={handleVerifyOtp}
        />
      )}
      {showAadhaarInfo && <AadhaarInfoCard />}
    </div>
  );
};

export default AdharUI;
