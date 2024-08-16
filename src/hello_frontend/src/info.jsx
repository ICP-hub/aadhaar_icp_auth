import React from 'react';

const AadhaarInfoCard = ({ aadhaarNumber }) => {
  return (
    <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aadhaar Information</title>
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
    <div className="card col-md-5 mx-auto my-3 shadow-sm">
      <div className="card-body">
        <h5>Aadhaar Card Info</h5>
        <div className="d-flex gap-3 border rounded p-2">
          <img
            src="https://visualpharm.com/assets/527/Person-595b40b85ba036ed117da7ec.svg"
            alt="Person Icon"
            width="85px"
            className="rounded"
          />
          <div>
            <div className="fs-5 fw-bold">
              <i className="bi bi-person-circle" /> John Doe
            </div>
            <div>Aadhaar No: {aadhaarNumber}</div> {/* Display Aadhaar Number */}
            <div>DOB: 01/01/1990</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AadhaarInfoCard;
