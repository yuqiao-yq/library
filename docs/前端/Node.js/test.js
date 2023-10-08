const fs = require('fs');

fs.readFile('./1.txt', 'utf-8', (err, data) => {
  if (err) {
    return console.log('failed!' + err.message);
  }
  console.log('content:' + data);
});
