const axios = require('axios');

async function testProfileUpdate() {
  try {
    // Step 1: Login to get a token
    console.log('Logging in...');
    const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
      email: 'maddox@gmail.com',
      password: 'sandy'
    });
    
    const { token, user } = loginResponse.data;
    console.log('Login successful. User ID:', user.id);
    console.log('Token:', token);
    
    // Step 2: Update the user profile
    console.log('\nUpdating profile...');
    const updatedName = 'Maddox Updated';
    try {
      const updateResponse = await axios.put(
        `http://localhost:8080/api/users/${user.id}`,
        {
          name: updatedName,
          email: user.email // Keep the same email
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Profile update response:', updateResponse.data);
      console.log('\nProfile updated successfully!');
    } catch (updateError) {
      console.error('Update error:', updateError.message);
      if (updateError.response) {
        console.error('Status:', updateError.response.status);
        console.error('Data:', updateError.response.data);
        console.error('Headers:', updateError.response.headers);
      }
      throw updateError;
    }
    
    // Step 3: Get the user profile to verify the update
    console.log('\nVerifying profile update...');
    const profileResponse = await axios.get(
      `http://localhost:8080/api/users/${user.id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Updated profile:', profileResponse.data);
    
    // Verify the name was updated
    if (profileResponse.data.name === updatedName) {
      console.log('\nSUCCESS: Profile name was updated correctly!');
    } else {
      console.log('\nERROR: Profile name was not updated correctly!');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testProfileUpdate();