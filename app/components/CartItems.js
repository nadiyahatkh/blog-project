import React from 'react';

const CartItem = ({ cart, removeFromCart }) => {
  return (
    <div>
      <h2>Keranjang Belanja</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>Price: ${item.price}</div>
            <button onClick={() => removeFromCart(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItem;
