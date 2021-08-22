const express = require('express')
const fs = require('fs')

const port = 3000
const app = express()

// fix to get over CORS error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  console.log('/');
  res.end('Hello World!');
});

app.get("/products", (req, res) => {
  console.log('/products');
  fs.readFile(__dirname + '/mocks/products.json', 'utf8', (err, data) => {
    res.end(data);
  });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});
