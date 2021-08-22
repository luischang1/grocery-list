import React, { useState, useReducer, useEffect } from 'react';
import { ProductTable } from './components';
import './App.css';


const App = () => {
  const [products, setProducts] = useState(null);

  const getProducts = () => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
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
      {products && (
        <div className="margin-left-medium">
          <ProductTable products={products} />
        </div>
      )}
    </div>
  );
};

export default App;
