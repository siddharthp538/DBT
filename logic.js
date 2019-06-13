var crypto = require('crypto');

var sha256 = crypto.createHash('sha256').update('abcd').digest('hex');
console.log(sha256);