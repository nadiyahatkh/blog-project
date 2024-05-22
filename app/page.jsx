'use client'
import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './cart/page';
import SideBar from './sidebar/sidebar';
import { fetchCategories, fetchProducts } from './apiService';
import { productsData } from './data/productsData';
// import Pagination from './components/Pagination';

export default function Home(){
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  // const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 9;

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // useEffect(() => {
  //   const loadProducts = async () => {
  //     const productsData = await fetchProducts();
      
  //     setProducts(productsData.data);
  //     // setFilteredProducts(productsData); // Inisialisasi produk yang telah difilter
  //   };
  //   const loadCategories = async () => {
  //     const categoriesData = await fetchCategories();
  //     setCategory(categoriesData);
  //   };
  //   loadProducts();
  //   loadCategories();
  // }, []);

  // useEffect(() => {
  //   fetch('http://192.168.88.152:8000/api/product/index')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data.data)
  //     })
  // }, [])

  // console.log(category)


  const handleAddToCart = (product) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      alert('berhasil add to cart');
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const cartItem = { ...product, cartId: Math.random().toString(36).substring(7), quantity: 1 };
      setCart(prevCart => [...prevCart, cartItem]);
      localStorage.setItem('cart', JSON.stringify([...cart, cartItem]));
    }
  };

  const handleFilter = (category) => {
    setCategory(category);
    setActiveCategory(category);
    
    if (category === 'all') {
      setProducts(productsData);
    } else {
      const filteredProducts = productsData.filter(product => product.category === category);
      setProducts(filteredProducts);
    }
  };
  // const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  return (
    <div className='' style={{ background: '#F7FAFC' }}>
      <div className="container mx-auto flex">
        {/* Sidebar */}
        <div className="w-1/4 mt-5">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Produk</h1>
            <hr className="mb-4" />
            {/* Kategori */}
            <h2 className="text-sm font-bold">Category</h2>
            <div className="mt-2">
              <p>
                <button
                  onClick={() => handleFilter('pakaian')}
                  className={`text-sm ${activeCategory === 'pakaian' ? ' text-blue-500' : ''}`}
                >
                  Fashion
                </button>
              </p>
              <p>
                <button
                  onClick={() => handleFilter('elektronik')}
                  className={`text-sm ${activeCategory === 'elektronik' ? 'text-blue-500' : ''}`}
                >
                  Electronic
                </button>
              </p>
              <p>
                <button
                  onClick={() => handleFilter('all')}
                  className={`text-sm ${activeCategory === 'all' ? 'text-blue-500' : ''}`}
                >
                  Semua
                </button>
              </p>
              {/* Tambah kategori lainnya di sini */}
            </div>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="w-3/4 mt-12">
          {/* Produk */}
          <div className="p-4">
            {/* Daftar Produk */}
            <div className="grid grid-cols-3 gap-4">
              {/* Card Produk */}
              {products?.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={() => handleAddToCart(product)} // Menambahkan properti untuk menangani penambahan ke keranjang
                />
              ))}
              {/* Tambah card produk lainnya di sini */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
