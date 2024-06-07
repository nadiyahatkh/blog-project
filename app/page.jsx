'use client'
import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import { addToCart, fetchCategories, fetchProducts, fetchProductsByCategory } from './apiService';
import { useSession } from 'next-auth/react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const {data:session} = useSession()

  const token = session?.user?.token

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts({token: token});
      setProducts(productsData.data);
      setFilteredProducts(productsData.data); // Inisialisasi produk yang telah difilter
    };

    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData.data);
    };

    loadProducts();
    loadCategories();
  }, [session]);

  

  const handleFilter = async (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredProducts(products);
    } else {
      const filteredProductsData = await fetchProductsByCategory(categoryId);
      setFilteredProducts(filteredProductsData.data);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await addToCart({ token: token, productId: product.id });
      console.log('Response from addToCart:', response);

      if (response && response.success) {
        setCart([...cart, response.data]);
        alert(message);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred while adding the product to cart. Please try again later.');
    }
  };

  return (
    <div className='' style={{ background: '#F7FAFC' }}>
      <div className="container mx-auto flex">
        <div className="w-1/4 mt-5">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Produk</h1>
            <hr className="mb-4" />
            <h2 className="text-sm font-bold">Category</h2>
            <div className="mt-2">
              
              {categories?.map((category) => (
                <p
                  key={category.id}
                  onClick={() => handleFilter(category.id)}
                  className={`cursor-pointer ${activeCategory === category.id ? ' text-blue-500' : ''}`}
                  // style={{ cursor: 'pointer', fontWeight: activeCategory === category.id ? 'bold' : 'normal' }}
                >
                  {category.name}
                </p>
              ))}
              <p
                onClick={() => handleFilter('all')}
                className={`cursor-pointer ${activeCategory === 'all' ? ' text-blue-500' : ''}`}
                // style={{ cursor: 'pointer', fontWeight: activeCategory === 'all' ? 'bold' : 'normal' }}
              >
                See all
              </p>
            </div>
          </div>
        </div>

        <div className="w-3/4 mt-12">
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {filteredProducts?.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
