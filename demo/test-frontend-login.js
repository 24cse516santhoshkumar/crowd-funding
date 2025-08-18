// Script to test frontend login functionality
const axios = require('axios');
const { JSDOM } = require('jsdom');

async function testFrontendLogin() {
  try {
    // First, get the frontend page to check if it's accessible
    console.log('Checking frontend accessibility...');
    const frontendResponse = await axios.get('http://localhost:8085/');
    console.log('Frontend is accessible!');
    
    // Now test the login API directly as the frontend would
    console.log('\nTesting login API as frontend would...');
    const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
      email: 'maddox@gmail.com',
      password: 'sandy'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Login API response successful!');
    console.log('Token:', loginResponse.data.token);
    console.log('User:', loginResponse.data.user);
    
    return true;
  } catch (error) {
    console.error('Operation failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    return false;
  }
}

testFrontendLogin();