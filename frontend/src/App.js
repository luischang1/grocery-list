import React, { useState, useEffect } from 'react';
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
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={clickHandler}>
          Click me
        </button>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={`product${p.id}`}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default App;
