'use client'
import { useState, useEffect } from 'react';
import CartItem from '../components/CartItems';


const Cart = () => {
  const [cart, setCart] = useState([]); // State untuk menyimpan keranjang belanja

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleApplyCoupon = (couponCode) => {
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  return (
    <div className="">
      <h1 className="">Keranjang</h1>
      <div className="">
        <CartItem cart={cart} removeFromCart={removeFromCart} />
      </div>
      
    </div>
  );
};

export default Cart;