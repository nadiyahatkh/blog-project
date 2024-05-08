
export default function ProductCard({product, onAddToCart}){
  const handleAddToCart = () => {
    const cartItem = { ...product, cartId: Math.random().toString(36).substring(7) }; // Menambahkan cartId ke objek produk
    onAddToCart(cartItem);
  };
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5">
      <a href="#">
        <img className="p-8 rounded-t-lg object-cover h-96 w-full" priority src={product.image} alt={product.name} />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">{product.name}</h5>
        </a>
        <div className="flex items-center justify-between mt-3">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">Rp{product.price}</span>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
  };


