'use client'
import { useState, useEffect } from 'react';
import CartItem from '../components/CartItems';


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, [cart]);
  
  const updateQuantity = (cartId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.cartId === cartId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };







  const handleApplyCoupon = (couponCode) => {
  };

  const removeFromCart = (cartId) => {
    // console.log(removeFromCart)
    const updatedCart = cart.filter(item => item.cartId !== cartId);
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCart(updatedCart);
  };

  const removeAllItems = () => {
    localStorage.removeItem('cart'); // Menghapus keranjang dari local storage
    setCart([]); // Menghapus semua item dari state keranjang
    setTotalPrice(0); // Mengatur total harga kembali ke 0
  };



  return (
    <div className="py-10 relative">
      
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <h2 class="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart</h2>
      {cart.map(product => (
        <CartItem key={product.cartId} product={product} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      ))}
      <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full mb-6">
                    <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                    <h6 className="font-semibold text-xl leading-8 text-gray-900">Rp{totalPrice}</h6>
                </div>
                <div className="flex items-center justify-between w-full py-6">
                    <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                    <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">Rp{totalPrice}</h6>
                </div>
                <div className='flex items-center justify-end w-full py-5'>
                <button onClick={removeAllItems}>Remove All</button>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Cart;