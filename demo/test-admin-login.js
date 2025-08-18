// Simple test script to check admin login
const axios = require('axios');

async function testAdminLogin() {
  try {
    console.log('Testing admin login...');
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      email: 'maddox@gmail.com',
      password: 'sandy'
    });
    
    console.log('Login successful!');
    console.log('Response:', response.data);
    console.log('Is admin?', response.data.user.isAdmin);
    
    return response.data;
  } catch (error) {
    console.error('Login failed!');
    console.error('Error:', error.response ? error.response.data : error.message);
    return null;
  }
}

testAdminLogin();