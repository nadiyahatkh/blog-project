import { useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";

const CartItem = ({ product, removeFromCart, updateQuantity }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleIncrease = async () => {
    const newQuantity = quantity + 1;
    console.log(product.id, newQuantity)
    await updateQuantity(product.id, newQuantity);
    setQuantity(newQuantity);
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      console.log(product.id, newQuantity)
      await updateQuantity(product.id, newQuantity);
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = async (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      console.log(product.id, newQuantity)
      await updateQuantity(product.id, newQuantity);
      setQuantity(newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div key={product.id} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 mb-3 justify-between">
      <div className="w-full md:max-w-[126px] flex">
        <img src={product.image} className="w-full h-auto max-h-[150px] p-4 object-cover" alt={product.name} />
        <div className="md-col-span-2">
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{product.name}</p>
            <p className="text-gray-300">{product.desc}</p>
            <button onClick={handleRemove} className="text-xs p-1 w-[75px] text-red-500 rounded border cursor-pointer">Remove</button>
          </div>
        </div>
      </div>
      <div>
        <p>{formatCurrency(product.price)}</p>
        <div className="flex items-center">
          <button onClick={handleDecrease} className="px-2 py-1 border">-</button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleInputChange}
            className="w-12 text-center border"
          />
          <button onClick={handleIncrease} className="px-2 py-1 border">+</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
