import React, { useState, useReducer, useEffect } from 'react';
import { ProductTable } from './components';
import './App.css';

const mockProducts = [
  {
    "id": 1,
    "name": "Banana",
    "price": 1.05
  },
  {
    "id": 2,
    "name": "Beer",
    "price": 4.50
  }
];

const App = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  const getProducts = () => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .catch(e => {
        setError(e);
        return mockProducts;
      })
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      });
  };

  const clickTimesReducer = (previousClickTimes, increase = true) => {
    if (increase) {
      if (!products) {
        getProducts();
      }
      return previousClickTimes + 1;
    }
    setProducts(null);
    setError(null);
    return 0;
  };

  const [clickTimes, increaseClickTimes] = useReducer(clickTimesReducer, 0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Clicked ${clickTimes} times`;
  }, [clickTimes]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code id="code">src/App.js</code> and save to reload.
        </p>
      </header>
      <p>
        <button onClick={increaseClickTimes}>
          Load
        </button>
        <button onClick={() => increaseClickTimes(false)} className="margin-left-medium">
          Reset
        </button>
      </p>
      {error && (
        <p className="error-message">
          Mock data, can't connect to API
        </p>
      )}
      {products && (
        <div className="margin-left-medium">
          <ProductTable products={products} />
        </div>
      )}
    </div>
  );
};

export default App;
