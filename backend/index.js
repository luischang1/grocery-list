const express = require('express')
const fs = require('fs')

const port = 3000
const app = express()

const getFileString = () => {
  return fs.readFileSync(__dirname + '/mocks/products.json', 'utf8', (err, data) => data);
};
const getFileJson = () => {
  return JSON.parse(getFileString());
};
const setFileJson = (data) => {
  fs.writeFile(__dirname + '/mocks/products.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('File saved');
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// fix to get over CORS error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.all('/', function (req, res, next) {
  console.log('Calling /');
  // pass control to the next handler
  next();
})

app.get('/ping', (req, res) => {
  console.log('GET - /ping');
  res.end('pong');
});

app.all('/products', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/products', (req, res) => {
  console.log('GET - /products');
  res.end(getFileString());
});

app.put('/products/:id', (req, res) => {
  console.log('PUT - /products', req.params.id), req.body;
  const products = getFileJson();
  const modifiedProductIndex = products.findIndex(p => p.id = req.params.id);
  const modifiedProduct = { ...products[modifiedProductIndex], ...req.body };
  products[modifiedProductIndex] = modifiedProduct;
  setFileJson(products);
  res.send({ success: true, message: 'Successfully modified product', product: modifiedProduct });
});

app.post('/products', (req, res) => {
  console.log('POST - /products', req.body);
  const products = getFileJson();
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  setFileJson(products);
  res.send({ success: true, message: 'Successfully created product', product: newProduct });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});
