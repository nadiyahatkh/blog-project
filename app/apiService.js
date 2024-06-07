import axios from "axios";

export const fetchProducts = async ({token}) => {
  try {
      const response = await fetch('http://192.168.18.103:8000/api/product/index/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then((res) => res.json())
      .then((data) => {
       return {
        data: data,
        message: "successs"
       }
      })
      return response.data
    } catch (error) {
      console.error(error);
      return "abs";
    }
  };

  export const fetchCategories = async () => {
    try {
      const response = await fetch('http://192.168.18.103:8000/api/category ');
      const data = await response.json();
      return data;
    } catch (error) {
      return 'abs';
    }
  };

  export const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://192.168.18.103:8000/api/product/index?category_id=${categoryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  };

  export const fetchCart = async ({ token, couponCode }) => {
    try {
      const response = await fetch(`http://192.168.18.103:8000/api/cart?coupon_code=${couponCode}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  };

  export const updateCartQuantity = async ({ id, newQuantity, token }) => {
    try {
        const updateResponse = await fetch(`http://192.168.18.103:8000/api/quantity-cart/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: newQuantity }),
        });

        if (!updateResponse.ok) {
            throw new Error('Failed to update cart quantity');
        }

        return await updateResponse.json();
    } catch (error) {
        console.error('Error updating cart quantity:', error);
    }
};
  
  

  export const addToCart = async ({ token, productId, quantity = 1 }) => {
    try {
      const response = await fetch('http://192.168.18.103:8000/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity,
        }),
      });
  
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      return null;
    }
  };
  
  
  export const checkOut = async ({token}) => {
    try {
      const response = await fetch('http://192.168.18.103:8000/api/checkOut', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error mengambil data keranjang:", error);
      return 'abs';
    }
  };

  export const removeFromCartAPI = async ({ id, token }) => {
    try {
      const response = await fetch(`http://192.168.18.103:8000/api/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      return await response.json();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  
  export const removeAllItemsAPI = async ({token}) => {
    try {
      const response = await fetch(`http://192.168.18.103:8000/api/delete-all`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove all items from cart');
      }
      return await response.json();
    } catch (error) {
      console.error('Error removing all items from cart:', error);
    }
  };
  