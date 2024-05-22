import { formatCurrency } from "../utils/formatCurrency";

export default function ProductCard({product, onAddToCart}){
  // const handleAddToCart = async () => {
  //   try {
  //     await fetch('http://192.168.18.103:8000/api/add-to-cart', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // Tambahkan header authorization jika diperlukan
  //       },
  //       body: JSON.stringify(product),
  //     });
  //     onAddToCart(product);
  //     alert('Produk berhasil ditambahkan ke keranjang.');
  //   } catch (error) {
  //     console.error('Gagal menambahkan produk ke keranjang:', error);
  //     alert('Gagal menambahkan produk ke keranjang.');
  //   }
  // };
  const handleAddToCart = () => {
    const cartItem = { ...product, cartId: Math.random().toString(36).substring(7) }; // Menambahkan cartId ke objek produk
    onAddToCart(cartItem);
  };
  return (
    <div className="border rounded bg-white">
    {/* Gambar Produk */}
    <img src={product.image} alt="Nama Produk" className="w-full h-64 object-cover mb-4 p-4" />
    <hr className="mb-1" />
    {/* Harga, Nama, Deskripsi, dan Tombol */}
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{formatCurrency(product.price)}</h2>
        <button onClick={handleAddToCart} className="hover:bg-blue-200 shadow-md text-blue-400 py-1 px-2 rounded border text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        </button>

      </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
      <p className="text-gray-500">{product.name}</p>
      <p className="text-gray-500">{product.desc}</p>
    </div>
  </div>
    // <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5">
    //   <a href="#">
    //     <img className="p-8 rounded-t-lg object-cover h-96 w-full" priority src={product.image} alt={product.name} />
    //   </a>
    //   <div className="px-5 pb-5">
    //     <a href="#">
    //       <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">{product.name}</h5>
    //     </a>
    //     <div className="flex items-center justify-between mt-3">
    //       <span className="text-3xl font-bold text-gray-900 dark:text-white">Rp{product.price}</span>
    //       <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleAddToCart}>Add To Cart</button>
    //     </div>
    //   </div>
    // </div>
  );
  };


