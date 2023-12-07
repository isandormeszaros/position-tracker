const apiKey = 'mx0vglbPicgJIOUd4n';
const apiSecret = '76df93f6ecae4621837d88f1454dd90a';
const crypto = require('crypto');

const endpoint = 'https://api.mexc.com/api/v1/account/balance';

const timestamp = Date.now();
const preHash = `${timestamp}GET${endpoint}`;
const signature = crypto.createHmac('sha256', apiSecret).update(preHash).digest('hex');

const headers = {
  'Content-Type': 'application/json',
  'x-auth-apikey': apiKey,
  'x-auth-signature': signature,
  'x-auth-timestamp': timestamp,
};

fetch(endpoint, {
  method: 'GET',
  headers: headers,
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

