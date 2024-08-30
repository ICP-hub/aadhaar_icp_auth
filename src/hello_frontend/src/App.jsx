import React, { useState, useEffect } from 'react';
import AadhaarInputCard from './AadharUI';
import OtpInputCard from './otp';
import AadhaarInfoCard from './info';

import PrincipalVerificationComponent from './principal'; // Import the PrincipalVerificationComponent
import RefIdComponent from './refid';

const AdharUI = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [showOtpCard, setShowOtpCard] = useState(false);
  const [showAadhaarInfo, setShowAadhaarInfo] = useState(false);
  const [showRefId, setShowRefId] = useState(false);
  const [showPrincipalVerification, setShowPrincipalVerification] = useState(false); // State to control rendering of PrincipalVerificationComponent
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
      alert(hardcodedOtp); // Log OTP to console

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

      // Delay showing the RefIdComponent (optional)
      setTimeout(() => {
        setShowRefId(true); // Show RefIdComponent after a delay or immediately

        // Further delay to show PrincipalVerificationComponent
        setTimeout(() => {
          setShowPrincipalVerification(true); // Show PrincipalVerificationComponent
        }, 2000); // Adjust the delay as needed
      }, 2000); // Adjust the delay as needed
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="container">
      {!showOtpCard && !showAadhaarInfo && !showRefId && (
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
      {showRefId && <RefIdComponent aadhaarNumber={aadhaarNumber}/>} {/* Render RefIdComponent */}
      {showPrincipalVerification && <PrincipalVerificationComponent />} {/* Render PrincipalVerificationComponent */}
    </div>
  );
};

export default AdharUI;
