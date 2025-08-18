// Simple script to test login functionality
const axios = require('axios');

async function testSimpleLogin() {
  try {
    console.log('=== SIMPLE LOGIN TEST ===');
    console.log('Testing login with admin credentials...');
    
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      email: 'maddox@gmail.com',
      password: 'sandy'
    });
    
    console.log('Login successful!');
    console.log('Token:', response.data.token);
    console.log('User:', response.data.user);
    
    return true;
  } catch (error) {
    console.error('Login failed!');
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

testSimpleLogin();