import { formatCurrency } from "../utils/formatCurrency";

export default function ProductCard({product, onAddToCart}){

    const handleAddToCart = () => {
      onAddToCart(product);
    };
    
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-500">&#9733;</span>); // filled star
      } else {
        stars.push(<span key={i} className="text-gray-400">&#9733;</span>); // empty star
      }
    }
    return stars;
  };
  return (
    <div className="border rounded bg-white">
    {/* Gambar Produk */}
    <img src={product.image} alt="Nama Produk" className="w-full h-64 object-cover mb-4 p-4" />
    <hr className="mb-1" />
    {/* Harga, Nama, Deskripsi, dan Tombol */}
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
          {product.discount_value > 0 ? (
            <div>
              <h2 className="text-lg font-bold inline mr-2">{formatCurrency(product.discounted_price)}</h2>
              <span className="text-gray-500 line-through">{formatCurrency(product.price)}</span>
            </div>
          ) : (
            <h2 className="text-lg font-bold">{formatCurrency(product.price)}</h2>
          )}
        <button onClick={handleAddToCart} className="hover:bg-blue-200 shadow-md text-blue-400 py-1 px-2 rounded border text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        </button>
      </div>
      <div className="flex items-center mb-2">
          {renderStars(product.product_rating)}
          <span className="ml-2 text-yellow-500">{product.product_rating.toFixed(1)}</span>
      </div>
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


