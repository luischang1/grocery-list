import React, { useState, useEffect } from 'react';
import { ProductTable } from './components';
import './App.css';

const App = () => {
  const [clickTimes, setClickTimes] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Clicked ${clickTimes} times`;
  });

  const getProducts = () => {
    fetch('http://localhost:3000/products').then(response => response.json()).then(data => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    });
  };

  const clickHandler = () => {
    getProducts();
    setClickTimes(clickTimes + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code id="code">src/App.js</code> and save to reload.
        </p>
      </header>
      <p>
        <button onClick={clickHandler}>
          Click me
        </button>
      </p>
      <div className="margin-left-medium">
        <ProductTable products={products}></ProductTable>
      </div>
    </div>
  );
};

export default App;
