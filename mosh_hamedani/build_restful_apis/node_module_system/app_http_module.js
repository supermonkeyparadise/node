const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hellow World');
    res.end();
  } else if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on('connection', socket => {
//   console.log('New connection...');
// });

// 監聽 port 3000
server.listen(3000);

console.log('Listening on port 3000');
