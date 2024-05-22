// apiService.js
export const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.18.103:8000/api/product/index/')
      .then((res) => res.json())
      .then((data) => {
       return {
        data: data,
        message: "successs"
       }
      })
      return response.data
    //   if (!response.ok) {
    //     throw new Error('Gagal mengambil produk');
    //   }
    //   const data = await response.json();
    //   console.log('Data yang diambil:', data); // Log untuk debugging
    //   return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(error);
      return "abs";
    }
  };

  export const fetchCategories = async () => {
    try {
      const response = await fetch('http://192.168.18.103:8000/api/product/index?category_id=${category_id}');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  export const addToCart = async (product_id, quantity = 1, coupon_code = null) => {
    const response = await fetch('http://192.168.18.103:8000/api/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id, quantity, coupon_code }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    return data;
};
  