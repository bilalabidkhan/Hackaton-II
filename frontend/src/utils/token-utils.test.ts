// Simple test to verify token storage functionality
// This is a manual verification approach since we don't have a full test suite set up

import Cookies from 'js-cookie';
import { storeToken, getToken, removeToken, syncTokens } from './token-utils';

// Test token storage functionality
function testTokenStorage() {
  console.log('Testing token storage functionality...');

  // Test 1: Store token and verify it's in both locations
  const testToken = 'test-jwt-token-' + Date.now();
  storeToken(testToken);

  // Check if token exists in cookies
  const cookieToken = Cookies.get('auth_token');
  console.log('Token in cookies:', cookieToken);

  // Check if token exists in localStorage
  const localStorageToken = localStorage.getItem('auth_token');
  console.log('Token in localStorage:', localStorageToken);

  // Verify both have the same value
  if (cookieToken === testToken && localStorageToken === testToken) {
    console.log('✓ Test 1 PASSED: Token stored in both locations correctly');
  } else {
    console.log('✗ Test 1 FAILED: Token not stored correctly in both locations');
  }

  // Test 2: Get token using utility function
  const retrievedToken = getToken();
  if (retrievedToken === testToken) {
    console.log('✓ Test 2 PASSED: Token retrieved correctly using utility function');
  } else {
    console.log('✗ Test 2 FAILED: Token not retrieved correctly');
  }

  // Test 3: Remove token and verify it's gone from both locations
  removeToken();
  const cookieTokenAfterRemove = Cookies.get('auth_token');
  const localStorageTokenAfterRemove = localStorage.getItem('auth_token');

  if (!cookieTokenAfterRemove && !localStorageTokenAfterRemove) {
    console.log('✓ Test 3 PASSED: Token removed from both locations correctly');
  } else {
    console.log('✗ Test 3 FAILED: Token not removed from both locations');
  }

  // Test 4: Synchronization functionality
  // Store in localStorage only
  localStorage.setItem('auth_token', testToken);
  syncTokens();

  const cookieAfterSync = Cookies.get('auth_token');
  const localStorageAfterSync = localStorage.getItem('auth_token');

  if (cookieAfterSync === testToken && localStorageAfterSync === testToken) {
    console.log('✓ Test 4 PASSED: Token synchronization works correctly');
  } else {
    console.log('✗ Test 4 FAILED: Token synchronization failed');
  }

  // Clean up
  removeToken();
  console.log('Token storage functionality tests completed.');
}

// Run the tests
testTokenStorage();