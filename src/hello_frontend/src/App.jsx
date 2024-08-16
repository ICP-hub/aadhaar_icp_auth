import React, { useState, useEffect } from 'react';
import AadhaarInputCard from './AadharUI';
import OtpInputCard from './otp';
import AadhaarInfoCard from './info';

const AdharUI = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [showOtpCard, setShowOtpCard] = useState(false);
  const [showAadhaarInfo, setShowAadhaarInfo] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const hardcodedOtp = '123456'; // Hardcoded OTP for example

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

  const handleOtpRequest = async () => {
    if (validateAadhaar()) {
      setIsOtpLoading(true); // Start loading

      // Simulate OTP sending delay
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay

      // Simulate OTP being sent
      alert( hardcodedOtp); // Log OTP to console

      setShowOtpCard(true); // Show OTP input card
      setIsOtpLoading(false); // Stop loading

      // Autofill the OTP after sending
      setOtp(hardcodedOtp);
    } else {
      alert('Please enter a valid 12-digit Aadhaar number.');
    }
  };

  const handleVerifyOtp = () => {
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
          isOtpLoading={isOtpLoading} // Pass loading state
        />
      )}
      {showOtpCard && (
        <OtpInputCard
          handleOtpChange={handleOtpChange}
          handleVerifyOtp={handleVerifyOtp}
          otpValue={otp} // Pass OTP value to autofill
        />
      )}
      {showAadhaarInfo && <AadhaarInfoCard aadhaarNumber={aadhaarNumber} />}
    </div>
  );
};

export default AdharUI;
