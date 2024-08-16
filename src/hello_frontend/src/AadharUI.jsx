import React, { useState } from 'react';

const AadhaarInputCard = ({ handleAadhaarChange, handleOtpRequest }) => {
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  const handleSendOtpClick = async () => {
    setIsOtpLoading(true);
    // Simulate OTP sending delay
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
    await handleOtpRequest(); // Call the OTP request handler
    setIsOtpLoading(false);
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Aadhaar Input</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />

      <nav className="navbar bg-body-tertiary shadow-sm border-bottom">
        <div className="container justify-content-center">
          <a className="navbar-brand" href="#">
            <img
              src="./images/aadhar_logo.jpg"
              alt="Logo"
              width={30}
              height={24}
              className="d-inline-block align-text-top fw-bold"
            />
            Aadhaar Verify API
          </a>
        </div>
      </nav>

      <div className="container">
        <div className="card col-md-5 mx-auto my-3 shadow-sm">
          <div className="card-body">
            <h5 className="my-3 text-center">Enter Your Aadhaar Card No</h5>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-fingerprint" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your 12-digit Aadhaar No"
                aria-label="AadhaarNumber"
                aria-describedby="basic-addon1"
                onChange={handleAadhaarChange}
              />
            </div>
            {!isOtpLoading && (
              <button className="btn btn-danger w-100 mt-3" onClick={handleSendOtpClick}>
                <i className="bi bi-send" /> SEND OTP
              </button>
            )}
            {isOtpLoading && (
              <button className="btn btn-danger w-100 mt-3" disabled>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>{" "}
                SENDING OTP...
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AadhaarInputCard;
