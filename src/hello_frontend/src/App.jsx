// import React, { useState, useEffect } from 'react';

function Adhar() {
  
  // JavaScript code for generating auth token
  const url = 'https://api.sandbox.co.in/authenticate';
  
  const headers = {
    'accept': 'application/json',
    'x-api-key': 'key_Live_xQp3KX7ZJLYSs9hij7vZ8xu9g5rvc1',
    'x-api-secret': 'secret_Live_MfshrIYD9quRCokmUgyxdPEGGThNWqtM',
    'x-api-version': '1.0'
  };
  

  
  // Fetch request for generating the auth token
  fetch(url, {
    method: 'POST',
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); // The result from the API
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  // Handling the request for Aadhar number
  if (new URLSearchParams(window.location.search).has('sendotp')) {
    const aadharno = new URLSearchParams(new FormData(document.querySelector('form'))).get('aadhar_no');
    console.log('Aadhar Number:', aadharno);
  }
  }
  
  export default Adhar;