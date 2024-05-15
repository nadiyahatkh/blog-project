import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';


const CartItem = ({ product, removeFromCart, updateQuantity }) => {

  // const increaseQuantity = () => {
  //   updateQuantity(product.cartId, product.quantity + 1);
  // };

  // const decreaseQuantity = () => {
  //   if (product.quantity > 1) {
  //     updateQuantity(product.cartId, product.quantity - 1);
  //   }
  // };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    updateQuantity(product.cartId, newQuantity);
  };

  return (
        <div key={product.cartId} className="flex min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 mb-3 justify-between">
          <div className="w-full md:max-w-[126px] flex">
              <img src={product.image}  className="mx-auto" alt="" />
              <div className='md-col-span-2'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-sm'>{product.name}</p>
                    <button onClick={()=> removeFromCart(product.cartId)} className='text-xs p-1 w-[75px] text-red-500 rounded border cursor-pointer'>Remove</button>
                </div>
            </div>
          </div>
            <div className=''>
                <p>{formatCurrency(product.price)}</p>
                {/* <label htmlFor={`quantity-${product.cartId}`} className="mr-2">Quantity:</label> */}
                <select
                  id={`quantity-${product.cartId}`}
                  value={product.quantity}
                  onChange={handleQuantityChange}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(number => (
                    <option key={number} value={number}>Qty: {number}</option>
                  ))}
                </select>
            </div>
          
        </div>
  );
};

export default CartItem;