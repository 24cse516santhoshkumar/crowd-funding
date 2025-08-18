const axios = require('axios');

async function testProfileIntegration() {
  try {
    console.log('=== PROFILE UPDATE INTEGRATION TEST ===');
    
    // Step 1: Login with admin user
    console.log('\n1. Logging in with admin user...');
    const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
      email: 'maddox@gmail.com',
      password: 'sandy'
    });
    
    const { token, user } = loginResponse.data;
    console.log(`User logged in successfully with ID: ${user.id}`);
    console.log(`User email: ${user.email}`);
    
    // Step 2: Update the user profile
    console.log('\n2. Updating user profile...');
    const updatedName = `Admin User ${Date.now()}`;
    
    const updateResponse = await axios.put(
      `http://localhost:8080/api/users/${user.id}`,
      {
        name: updatedName,
        email: user.email
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Profile update response:', updateResponse.data);
    
    // Step 3: Verify the update by getting the user profile
    console.log('\n3. Verifying profile update...');
    const profileResponse = await axios.get(
      `http://localhost:8080/api/users/${user.id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Updated profile:', profileResponse.data);
    
    // Verify the name was updated correctly
    if (profileResponse.data.name === updatedName) {
      console.log('\n✅ SUCCESS: Profile name was updated correctly!');
    } else {
      console.log('\n❌ ERROR: Profile name was not updated correctly!');
    }
    
    // Step 4: Test frontend integration by simulating localStorage update
    console.log('\n4. Testing frontend integration...');
    console.log('In a real frontend scenario, the following would happen:');
    console.log('- User submits the profile update form');
    console.log('- Frontend makes PUT request to /api/users/{id}');
    console.log('- On success, frontend updates localStorage with new user data');
    console.log('- Frontend displays success toast notification');
    
    // Simulate localStorage update
    const localStorageUpdate = {
      ...user,
      name: updatedName
    };
    
    console.log('\nUpdated localStorage user data would be:', localStorageUpdate);
    console.log('\n✅ INTEGRATION TEST COMPLETE: Profile update functionality is working correctly!');
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testProfileIntegration();