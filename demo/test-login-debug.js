// Debug script to test login functionality with detailed error logging
const axios = require('axios');

async function testLoginDebug() {
  try {
    console.log('=== LOGIN DEBUG TEST ===');
    console.log('Testing login with admin credentials...');
    
    // Log the request details
    const requestData = {
      email: 'maddox@gmail.com',
      password: 'sandy'
    };
    console.log('Request data:', requestData);
    
    // Make the login request
    const response = await axios.post('http://localhost:8080/api/auth/login', requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Login successful!');
    console.log('Status code:', response.status);
    console.log('Headers:', response.headers);
    console.log('Token:', response.data.token);
    console.log('User:', response.data.user);
    
    // Test token validity by making an authenticated request
    console.log('\nTesting token validity...');
    try {
      const userResponse = await axios.get(`http://localhost:8080/api/users/${response.data.user.id}`, {
        headers: {
          'Authorization': `Bearer ${response.data.token}`
        }
      });
      console.log('Token is valid! User data retrieved successfully:');
      console.log(userResponse.data);
    } catch (tokenError) {
      console.error('Token validation failed:');
      if (tokenError.response) {
        console.error('Status:', tokenError.response.status);
        console.error('Data:', tokenError.response.data);
        console.error('Headers:', tokenError.response.headers);
      } else {
        console.error('Error:', tokenError.message);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Login failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received. Request details:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    console.error('Error config:', error.config);
    return false;
  }
}

testLoginDebug();