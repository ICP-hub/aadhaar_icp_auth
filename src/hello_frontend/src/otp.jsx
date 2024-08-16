import React from 'react';

const OtpInputCard = ({ handleOtpChange, handleVerifyOtp }) => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Enter OTP</title>
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
            Aadhar Verify API
          </a>
        </div>
      </nav>

      <div className="container">
        <div className="card col-md-5 mx-auto my-3 shadow-sm">
          <div className="card-body">
            <h5 className="my-3 text-center">
              Enter OTP sent to your registered mobile no
            </h5>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-phone" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="######"
                aria-label="Otp"
                aria-describedby="basic-addon1"
                onChange={handleOtpChange}
              />
            </div>
            <button className="btn btn-primary w-100 mt-3" onClick={handleVerifyOtp}>
              <i className="bi bi-shield-check" /> VERIFY OTP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpInputCard;
