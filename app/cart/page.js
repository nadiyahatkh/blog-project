'use client'
import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItems';
import {
  Heading,
  Input,
} from '@chakra-ui/react';
import Link from 'next/link';
import { formatCurrency } from '../utils/formatCurrency';
import { checkOut, fetchCart, updateCartQuantity, removeFromCartAPI, removeAllItemsAPI } from '../apiService';
import { useSession } from 'next-auth/react';

const Cart = () => {
  const [cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const { data: session } = useSession();
  const token = session?.user?.token;

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await fetchCart({ token, couponCode });
      if (cartData) {
        setCart(cartData);
        setTotalPrice(cartData.totalpricee);
        setDiscountPrice(cartData.discountprice);
      }
    };
    if (token) {
      loadCart();
    }
  }, [session, couponCode, token]);

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      const result = await updateCartQuantity({ id, newQuantity, token });
      console.log(result)
      if (result && result.message === 'Quantity updated successfully') {
        if (cart && cart.cartItems) {
          const updatedCartItems = cart.cartItems.map(item => {
            if (item.id === id) {
              return { ...item, quantity: newQuantity };
            }
            return item;
          });
          const updatedCart = { ...cart, cartItems: updatedCartItems };
          setCart(updatedCart);
  
          // Update totalPrice based on updatedCart
          const updatedTotalPrice = updatedCart.cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
          setTotalPrice(updatedTotalPrice);
        } else {
          console.error('Invalid cart data:', cart);
        }
      } else {
        console.error('Failed to update item from cart:', result?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };
  
  
  
  
  
  

  const handleApplyCoupon = async () => {
    console.log('Applying coupon code:', couponCode);
    try {
      const cartData = await fetchCart({ token, couponCode });
      if (cartData) {
        setCart(cartData);
        setTotalPrice(cartData.totalpricee);
        setDiscountPrice(cartData.discountprice);
      } else {
        alert('Invalid or expired coupon code');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const result = await removeFromCartAPI({ id, token });

      if (result && result.message && result.message.includes('success')) {
        const updatedCart = cart.cartItems.filter(item => item.id !== id);
        setCart({ ...cart, cartItems: updatedCart });
        const updatedTotalPrice = updatedCart.reduce((total, item) => total + (item.quantity * item.price), 0);
        setTotalPrice(updatedTotalPrice);
      } else {
        console.error('Failed to remove item from cart:', result?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const removeAllItems = async () => {
    try {
      const result = await removeAllItemsAPI({ token });

      if (result && result.message && result.message.includes('success')) {
        console.log('All items removed successfully:', result.message);
        setCart({ cartItems: [] });
        setTotalPrice(0);
        setDiscountPrice(0);
      } else {
        console.error('Error removing all items from cart:', result?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error removing all items from cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
        // Lakukan checkout
        const result = await checkOut({ token });

        if (result && result.status && result.status === 'Berhasil Checkout') {
            setCart(result.updatedCart);
            setTotalPrice(0);
            setDiscountPrice(0);
            alert('Checkout berhasil!');
        } else {
            // Jika ada kesalahan selama checkout, log pesan error
            if (result && result.status) {
                // Jika respons memiliki status, namun bukan 'Berhasil Checkout', tampilkan pesan kesalahan
                alert(result.status); // Menampilkan pesan kesalahan dari server
            } else {
                // Jika respons tidak memiliki status, tampilkan pesan kesalahan default
                alert('Error saat proses checkout. Silakan coba lagi.');
            }
        }
    } catch (error) {
        // Jika terjadi kesalahan, log pesan error
        console.error('Error saat proses checkout:', error);
        alert('Error saat proses checkout. Silakan coba lagi.');
    }
};


  
  
  
  

  return (
    <div className="py-4" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="title font-manrope font-bold text-2xl leading-10 mb-8 text-black">Keranjang Saya</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="bg-white rounded border shadow-md p-4">
              {cart && cart.cartItems?.length > 0 ? (
                cart.cartItems?.map(product => (
                  <CartItem
                    key={product.id}
                    product={product}
                    removeFromCart={removeFromCart}
                    updateQuantity={handleQuantityChange}
                  />
                ))
              ) : (
                <p>Keranjang belanja Anda kosong</p>
              )}
              <div className="flex items-center justify-between w-full">
                <Link href="/" className="rounded border bg-blue-500 text-white p-2 text-sm">
                  Back to shop
                </Link>
                <button className="rounded border text-blue-500 text-sm p-2" onClick={removeAllItems}>Remove All</button>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <div className="bg-white rounded border shadow-sm p-4">
              <Heading size="xs" className="text-gray-400">
                Have a coupon?
              </Heading>
              <div className="flex">
                <Input type="text" placeholder="Add coupon" className="flex-grow py-2" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <button onClick={handleApplyCoupon} className="px-4 py-2 text-xs rounded border text-blue-300 hover:bg-blue-200">Apply</button>
              </div>
            </div>
            <div className="bg-white rounded border shadow-sm p-4 flex-grow-0">
              <div className="flex items-center justify-between w-full">
                <p className="font-normal text-sm leading-8">Sub total:</p>
                <h6 className="font-normal text-sm leading-8 text-gray-900">{formatCurrency(totalPrice + discountPrice)}</h6>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="font-normal text-sm leading-8">Discount:</p>
                <h6 className="font-normal text-sm leading-8 text-red-600">- {formatCurrency(discountPrice)}</h6>
              </div>
              <hr className="my-4" />
              <div className="flex items-center w-full justify-between">
                <p className="text-sm font-bold">Total</p>
                <h6 className="mb-1 text-sm font-bold">{formatCurrency(totalPrice)}</h6>
              </div>
              <button className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-200" onClick={handleCheckout}>Check out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
