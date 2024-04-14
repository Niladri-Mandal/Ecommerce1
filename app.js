const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const category = queryObject.category;

  if (req.url === '/') {
    fs.readFile('products.json', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      const products = JSON.parse(data);

      if (category) {
        const filteredProducts = products.filter(product => product.category === category);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filteredProducts));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3001, () => {
  console.log('Server started...');
});

server.on('error', (err) => {
  console.error('Unable to start server:', err.message);
});
