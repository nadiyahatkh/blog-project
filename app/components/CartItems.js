import React from 'react';

const CartItem = ({ product, removeFromCart, updateQuantity }) => {

  const increaseQuantity = () => {
    updateQuantity(product.cartId, product.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (product.quantity > 1) {
      updateQuantity(product.cartId, product.quantity - 1);
    }
  };

  return (
    <div>
      <div>
          <div key={product.cartId} className="md:flex items-center mt-14 py-8 border-t border-gray-200">
          <div className="w-1/4">
              <img src={product.image} alt className="w-full h-full object-center object-cover" />
          </div>
          <div className="md:pl-3 md:w-3/4">
              <div className="flex items-center justify-between w-full pt-1">
                  <p className="text-base font-black leading-none text-gray-800">{product.name}</p>
              </div>
              <div className="flex items-center justify-between pt-5 pr-6">
                <div className="flex items-center">
                  <button onClick={decreaseQuantity} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">-</button>
                  <p className="text-base font-black leading-none text-gray-800 mx-2">Quantity: {product.quantity}</p>
                  <button onClick={increaseQuantity} className="text-xs leading-3 underline text-green-500 pl-5 cursor-pointer">+</button>
                </div>
                  <div className="flex itemms-center">
                      <button onClick={() => removeFromCart(product.cartId)} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</button>
                  </div>
                  <p className="text-base font-black leading-none text-gray-800">Rp{product.price}</p>
              </div>
          </div>
      </div>
        
                                   
      </div>
    </div>
  );
};

export default CartItem;
