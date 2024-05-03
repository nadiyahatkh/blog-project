'use client'
import { useState, useEffect } from 'react';
import { productsData } from './data/productsData';
import ProductCard from './components/ProductCard';
import Cart from './cart/page';

export default function Home(){
    const [products, setProducts] = useState(productsData);
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);

  console.log(cart)
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    console.log(storedCart)
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);


  const handleAddToCart = (product) => {
    const cartItem = {...product, cartId: Math.random().toString(36).substring(7)}
    localStorage.setItem('cart', JSON.stringify([...cart, cartItem]));

    setCart(prevCart => [...prevCart, cartItem]);
  };

  const handleFilter = (category) => {
    setCategory(category);
    
    if (category === 'all') {
      setProducts(productsData);
    } else {
      const filteredProducts = productsData.filter(product => product.category === category);
      setProducts(filteredProducts);
    }
  };

  

  



  return (
      <div className="">
        <div className="">
          <button onClick={() => handleFilter('all')}>Semua</button>
          <button onClick={() => handleFilter('elektronik')}>Elektronik</button>
          <button onClick={() => handleFilter('pakaian')}>Pakaian</button>
        </div>
        <div className="grid grid-cols-3 mt-5 place-items-center">
          {products.map(product => (
            <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={() => handleAddToCart(product)} // Menambahkan properti untuk menangani penambahan ke keranjang
            />
          ))}
        </div>
      </div>
  );
};