'use client'
import { useState } from 'react';
import { productsData } from '../data/productsData';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState(productsData);
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);



  const handleFilter = (category) => {
    setCategory(category);
    
    if (category === 'all') {
      setProducts(productsData);
    } else {
      const filteredProducts = productsData.filter(product => product.category === category);
      setProducts(filteredProducts);
    }
  };

  const handleAddToCart = (productId) => {
    console.log(handleAddToCart)
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const productToAdd = products.find(product => product.id === productId);
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
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
            handleAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </div>
  );
};

export default Home;
