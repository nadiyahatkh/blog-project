import React from 'react';

const CartItem = ({ cart, removeFromCart }) => {

  return (
    <div>
      <div>
        {cart.map(item => (
          <div key={item.id} className="md:flex items-center mt-14 py-8 border-t border-gray-200">
          <div className="w-1/4">
              <img src={item.image} alt className="w-full h-full object-center object-cover" />
          </div>
          <div className="md:pl-3 md:w-3/4">
              <div className="flex items-center justify-between w-full pt-1">
                  <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
              </div>
              <div className="flex items-center justify-between pt-5 pr-6">
                  <div className="flex itemms-center">
                      <button onClick={() => removeFromCart(item.cartId)} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</button>
                  </div>
                  <p className="text-base font-black leading-none text-gray-800">{item.price}</p>
              </div>
          </div>
      </div>
        ))}
        
                                   
      </div>
    </div>
  );
};

export default CartItem;
