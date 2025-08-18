// Script to test browser login functionality
const puppeteer = require('puppeteer');

async function testBrowserLogin() {
  console.log('=== BROWSER LOGIN TEST ===');
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to the login page
    console.log('Navigating to login page...');
    await page.goto('http://localhost:8084/login', { waitUntil: 'networkidle2' });
    
    // Fill in the login form
    console.log('Filling login form...');
    await page.type('input[type="email"]', 'maddox@gmail.com');
    await page.type('input[type="password"]', 'sandy');
    
    // Take a screenshot before submitting
    await page.screenshot({ path: 'login-form-filled.png' });
    
    // Submit the form and don't wait for navigation
    console.log('Submitting login form...');
    await page.click('button[type="submit"]');
    
    // Wait for a moment to allow the form submission to process
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Take a screenshot after login attempt
    await page.screenshot({ path: 'after-login-attempt.png' });
    
    // Check if login was successful by looking for elements that should be present after login
    const isLoggedIn = await page.evaluate(() => {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      return { token, user };
    });
    
    console.log('Login status:', isLoggedIn.token ? 'Successful' : 'Failed');
    console.log('Token:', isLoggedIn.token);
    console.log('User:', isLoggedIn.user);
    
    // Check console logs for any errors
    const logs = await page.evaluate(() => {
      return window.consoleErrors || [];
    });
    
    if (logs.length > 0) {
      console.log('Console errors found:');
      console.log(logs);
    }
    
    return isLoggedIn.token ? true : false;
  } catch (error) {
    console.error('Error during browser test:', error);
    await page.screenshot({ path: 'login-error.png' });
    return false;
  } finally {
    // Wait for a moment to see the result
    await new Promise(resolve => setTimeout(resolve, 5000));
    await browser.close();
  }
}

testBrowserLogin();