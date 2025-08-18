// Script to test registration and login functionality
const axios = require('axios');

async function testRegisterAndLogin() {
  try {
    // Generate a unique email to avoid conflicts
    const uniqueEmail = `test${Date.now()}@example.com`;
    
    // Step 1: Register a new user
    console.log('Registering a new user...');
    const registerResponse = await axios.post('http://localhost:8080/api/auth/register', {
      name: 'Test User',
      email: uniqueEmail,
      password: 'password123'
    });
    
    console.log('Registration successful!');
    console.log('Token:', registerResponse.data.token);
    console.log('User:', registerResponse.data.user);
    
    // Step 2: Login with the newly created user
    console.log('\nTesting login with new user credentials...');
    const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
      email: uniqueEmail,
      password: 'password123'
    });
    
    console.log('Login successful!');
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

testRegisterAndLogin();