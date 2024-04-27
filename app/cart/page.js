'use client'
import { useState } from 'react';
import CartItem from '../components/CartItems';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);


  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleUpdateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: parseInt(quantity) };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const handleApplyCoupon = (couponCode) => {
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="">
      <h1 className="">Keranjang</h1>
      <div className="">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={() => handleRemoveItem(item.id)}
            onUpdateQuantity={(quantity) => handleUpdateQuantity(item.id, quantity)}
          />
        ))}
      </div>
      <div className="">
        <div className="">
          <input type="text" placeholder="Masukkan kode kupon" />
          <button onClick={() => handleApplyCoupon()}>Gunakan Kupon</button>
        </div>
        <div className="">
          <h3>Total Harga: {totalPrice}</h3>
          <button onClick={() => setCartItems([])}>Hapus Semua</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
