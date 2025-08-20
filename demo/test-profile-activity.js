// Test script to verify Profile page activity display
const axios = require('axios');

async function testProfileActivity() {
  try {
    console.log('=== PROFILE ACTIVITY TEST ===');
    
    // First, login to get a token
    console.log('1. Logging in...');
    const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
      email: 'maddox@gmail.com',
      password: 'sandy'
    });
    
    const token = loginResponse.data.token;
    const user = loginResponse.data.user;
    
    console.log('Login successful!');
    console.log('User:', user.name, '(', user.email, ')');
    
    // Test the my-campaigns endpoint
    console.log('\n2. Testing my-campaigns endpoint...');
    const campaignsResponse = await axios.get('http://localhost:8080/api/campaigns/my-campaigns', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Campaigns found:', campaignsResponse.data.totalElements);
    if (campaignsResponse.data.content.length > 0) {
      campaignsResponse.data.content.forEach((campaign, index) => {
        console.log(`  Campaign ${index + 1}: ${campaign.title} (${campaign.status})`);
      });
    }
    
    // Test the my-donations endpoint
    console.log('\n3. Testing my-donations endpoint...');
    const donationsResponse = await axios.get('http://localhost:8080/api/donations/my-donations', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Donations found:', donationsResponse.data.totalElements);
    if (donationsResponse.data.content.length > 0) {
      donationsResponse.data.content.forEach((donation, index) => {
        console.log(`  Donation ${index + 1}: $${donation.amount} to ${donation.campaign?.title || 'Unknown Campaign'}`);
      });
    }
    
    console.log('\n✅ Profile activity endpoints are working correctly!');
    console.log('The Profile page should now display:');
    console.log(`- ${campaignsResponse.data.totalElements} campaigns created`);
    console.log(`- ${donationsResponse.data.totalElements} donations made`);
    
    return true;
  } catch (error) {
    console.error('❌ Test failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    return false;
  }
}

testProfileActivity();
