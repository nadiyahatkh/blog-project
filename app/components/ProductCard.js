import React from 'react';

const ProductCard = ({ product, handleAddToCart }) => {

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5">
      <a href="#">
        <img className="p-8 rounded-t-lg object-cover h-96 w-full" src={product.image} alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">{product.name}</h5>
        </a>
        <div className="flex items-center justify-between mt-3">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">Rp{product.price}</span>
            <button onClick={() => handleAddToCart(product.id)}>Tambah ke Keranjang</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
