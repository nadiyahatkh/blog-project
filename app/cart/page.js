'use client';
import { useState, useEffect } from 'react';
import CartItem from '../components/CartItems';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import Link from 'next/link';
import { formatCurrency } from '../utils/formatCurrency';


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState(''); 
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const response = await fetch('http://192.168.18.103:8000/api/cart');
  //       const data = await response.json();
  //       setCart(data.cartItems);
  //       setTotalPrice(data.totalPrice);
  //     } catch (error) {
  //       console.error('Error fetching cart:', error);
  //     }
  //   };

  //   fetchCart();
  // }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalAfterDiscount = total - discount;
    setTotalPrice(totalAfterDiscount >= 0 ? totalAfterDiscount : 0);

    // Hitung jumlah diskon
    const calculatedDiscount = total - totalAfterDiscount;
    setDiscountAmount(calculatedDiscount);
  }, [cart, discount]);

  // const updateQuantity = async (cartId, newQuantity) => {
  //   try {
  //     const response = await fetch(`/api/cart/updateQuantity/${cartId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ quantity: newQuantity })
  //     });
  //     const data = await response.json();

  //     if (response.ok) {
  //       const updatedCart = cart.map(item => {
  //         if (item.id === cartId) {
  //           return data.updatedCartItem;
  //         }
  //         return item;
  //       });
  //       setCart(updatedCart);
  //       setTotalPrice(data.totalpri);
  //     } else {
  //       console.error('Failed to update quantity:', data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error updating quantity:', error);
  //   }
  // };

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

  const handleApplyCoupon = () => {
    const validCoupons = ['DISCOUNT10', 'SALE20'];
    if (validCoupons.includes(couponCode)) {
      if (couponCode === 'DISCOUNT10') {
        setDiscount(100);
      } else if (couponCode === 'SALE20') {
        setDiscount(20);
      }
    } else {
      alert('Kode kupon tidak valid');
    }
  };

  const removeFromCart = (cartId) => {
    const updatedCart = cart.filter(item => item.id !== cartId);
    setCart(updatedCart);
  };

  const removeAllItems = () => {
    setCart([]); 
    setTotalPrice(0);
    setDiscount(0);
  };

  return (
    <div className="py-4" style={{ backgroundColor: '#F7FAFC' }}>
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="title font-manrope font-bold text-2xl leading-10 mb-8 text-black">Keranjang Saya</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="bg-white rounded border shadow-md p-4">
              {cart.map(product => (
                <CartItem key={product.cartId} product={product} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
              ))}
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
                <h6 className="font-normal text-sm leading-8 text-gray-900">{formatCurrency(totalPrice + discountAmount)}</h6>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="font-normal text-sm leading-8">Discount:</p>
                <h6 className="font-normal text-sm leading-8 text-red-600">- {formatCurrency(discountAmount)}</h6>
              </div>
              <hr className="my-4" />
              <div className="flex items-center w-full justify-between">
                <p className="text-sm font-bold">Total</p>
                <h6 className="mb-1 text-sm font-bold">{formatCurrency(totalPrice)}</h6>
              </div>
              <button className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-200">Check out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;