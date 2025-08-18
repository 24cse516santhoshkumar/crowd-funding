// Simple script to test login functionality
const axios = require('axios');

async function testLogin() {
  try {
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
    } else {
      console.error('Error:', error.message);
    }
    return false;
  }
}

testLogin();