import { create } from "zustand";
import axios from "axios";

export const useProductsStore = create((set) => ({
  products: [],
  total: 0,
  loading: false,
  error: null,

  fetchProducts: async (limit = 12, skip = 0, q = "") => {
    set({ loading: true });

    try {
      const url = q
        ? `https://dummyjson.com/products/search?q=${q}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

      const res = await axios.get(url);

      set({
        products: res.data.products,
        total: res.data.total,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchProductById: async (id) => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
  },
}));
