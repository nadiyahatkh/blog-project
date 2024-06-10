'use client'
import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import { addToCart, fetchCategories, fetchProducts, fetchProductsByCategory } from './apiService';
import { useSession } from 'next-auth/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false); // State untuk menampilkan modal stok habis
  const [showAddToCartModal, setShowAddToCartModal] = useState(false); // State untuk menampilkan modal "Add to Cart"
  const [selectedProduct, setSelectedProduct] = useState(null);// State untuk menyimpan produk yang dipilih// State untuk menyimpan produk yang dipilih

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts({ token: token });
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
      if (product.stock < 1) { // Periksa apakah stok produk habis
        setShowOutOfStockModal(true); // Tampilkan modal stok habis jika stok habis
        setSelectedProduct(product); // Simpan produk yang dipilih untuk ditampilkan dalam modal
        return; // Hentikan eksekusi penambahan produk ke keranjang jika stok habis
      }
      setSelectedProduct(product); // Set produk yang dipilih untuk ditambahkan ke keranjang
      setShowAddToCartModal(true); // Tampilkan modal "Add to Cart"
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred while adding the product to cart. Please try again later.');
    }
  };

  // Fungsi untuk menambahkan produk ke keranjang setelah pengguna mengkonfirmasi
  const handleAddToCartConfirmation = async () => {
    try {
      const response = await addToCart({ token: token, productId: selectedProduct.id });
      console.log('Response from addToCart:', response);

      if (response && response.success) {
        setCart([...cart, response.data]);
      } else {
        setShowAddToCartModal(false);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred while adding the product to cart. Please try again later.');
    } finally {
      setShowAddToCartModal(false); // Tutup modal "Add to Cart"
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
                >
                  {category.name}
                </p>
              ))}
              <p
                onClick={() => handleFilter('all')}
                className={`cursor-pointer ${activeCategory === 'all' ? ' text-blue-500' : ''}`}
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

      {/* Modal Stok Habis */}
      <Modal isOpen={showOutOfStockModal} onClose={() => setShowOutOfStockModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Out of Stock</ModalHeader>
          <ModalBody>
            <p>{selectedProduct?.name} is currently out of stock. Please check back later.</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setShowOutOfStockModal(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Add to Cart */}
      <Modal isOpen={showAddToCartModal} onClose={() => setShowAddToCartModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add to Cart</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to add {selectedProduct?.name} to your cart?</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddToCartConfirmation}>Yes</Button>
            <Button variant="ghost" onClick={() => setShowAddToCartModal(false)}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
