// Debug script to test frontend login functionality
const axios = require('axios');

async function testFrontendLoginDebug() {
  try {
    console.log('=== FRONTEND LOGIN DEBUG TEST ===');
    
    // Step 1: Check if frontend is accessible
    console.log('\n1. Checking frontend accessibility...');
    try {
      const frontendResponse = await axios.get('http://localhost:8084/');
      console.log('Frontend is accessible at port 8084!');
    } catch (frontendError) {
      console.log('Could not access frontend at port 8084, trying port 8085...');
      try {
        const frontendResponse2 = await axios.get('http://localhost:8085/');
        console.log('Frontend is accessible at port 8085!');
      } catch (frontendError2) {
        console.error('Could not access frontend at either port 8084 or 8085');
        console.error('Error:', frontendError2.message);
      }
    }
    
    // Step 2: Test the login API directly as the frontend would
    console.log('\n2. Testing login API as frontend would...');
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
    
    // Step 3: Simulate frontend localStorage operations
    console.log('\n3. Simulating frontend localStorage operations...');
    console.log('In the frontend, these values would be stored in localStorage:');
    console.log(`localStorage.setItem('token', '${loginResponse.data.token}')`);
    console.log(`localStorage.setItem('user', '${JSON.stringify(loginResponse.data.user)}')`);
    
    // Step 4: Simulate navigation after login
    console.log('\n4. After successful login, frontend would navigate to home page');
    console.log('navigate("/") would be called');
    
    return true;
  } catch (error) {
    console.error('Operation failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received');
      console.error('Request:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return false;
  }
}

testFrontendLoginDebug();