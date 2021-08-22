import React from 'react';
import { formatMoney } from '../../utils'
import './ProductTable.css';

const ProductTable = ({ products }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={`product-${p.id}`}>
            <td className="product-table-cell-number">{p.id}</td>
            <td className="product-table-cell-text">{p.name}</td>
            <td className="product-table-cell-number">{formatMoney(p.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
