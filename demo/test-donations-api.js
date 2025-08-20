const axios = require('axios');

const BASE_URL = 'http://localhost:8080';

async function testDonationsAPI() {
  try {
    console.log('🧪 Testing Donations API...\n');

    // Test 1: Check if server is running
    console.log('1. Testing server connectivity...');
    try {
      const healthCheck = await axios.get(`${BASE_URL}/api/campaigns?page=0&size=1`);
      console.log('✅ Server is running, campaigns endpoint accessible');
    } catch (error) {
      console.log('❌ Server not accessible:', error.message);
      return;
    }

    // Test 2: Test authentication
    console.log('\n2. Testing authentication...');
    let token;
    try {
      const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: 'testuser@gmail.com',
        password: 'password'
      });
      token = loginResponse.data.token;
      console.log('✅ Login successful, token received');
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data || error.message);
      return;
    }

    // Test 3: Test my-donations endpoint
    console.log('\n3. Testing my-donations endpoint...');
    try {
      const donationsResponse = await axios.get(`${BASE_URL}/api/donations/my-donations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ My donations endpoint accessible');
      console.log('📊 Response data:', JSON.stringify(donationsResponse.data, null, 2));
    } catch (error) {
      console.log('❌ My donations endpoint failed:', error.response?.data || error.message);
      console.log('Status:', error.response?.status);
      console.log('Headers:', error.response?.headers);
    }

    // Test 4: Test creating a donation
    console.log('\n4. Testing donation creation...');
    try {
      const donationResponse = await axios.post(`${BASE_URL}/api/donations`, {
        campaign: { id: 1 },
        amount: 50,
        date: new Date().toISOString().split('T')[0]
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ Donation created successfully');
      console.log('💰 Created donation:', JSON.stringify(donationResponse.data, null, 2));
    } catch (error) {
      console.log('❌ Donation creation failed:', error.response?.data || error.message);
    }

    // Test 5: Test my-donations again to see if new donation appears
    console.log('\n5. Testing my-donations endpoint again...');
    try {
      const donationsResponse2 = await axios.get(`${BASE_URL}/api/donations/my-donations`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('✅ My donations endpoint accessible after donation');
      console.log('📊 Updated response data:', JSON.stringify(donationsResponse2.data, null, 2));
    } catch (error) {
      console.log('❌ My donations endpoint failed after donation:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

// Run the test
testDonationsAPI();
