import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="">
      <img src={`/images/${item.image}`} alt={item.name} />
      <div className="">
        <h3>{item.name}</h3>
        <p>{item.price}</p>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(e.target.value)}
        />
        <button onClick={onRemove}>Hapus</button>
      </div>
    </div>
  );
};

export default CartItem;
