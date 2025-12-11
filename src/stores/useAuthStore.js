"use client"
import axiosClient from "@/lib/api";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  token: null,
  user: null,
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      const { token } = res.data;
      set({ token, user: res.data, loading: false });

      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify({ token, user: res.data }));
      }
    } catch (err) {
      console.error("Login error:", err);
      set({
        error: err?.response?.data?.message || err.message || "Login failed",
        loading: false,
      });
    }
  },

  logout: () => {
    set({ token: null, user: null });
    if (typeof window !== "undefined") localStorage.removeItem("auth");
  },

  setFromLocalStorage: () => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("auth");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.token && parsed.user) {
        set({ token: parsed.token, user: parsed.user });
      }
    } catch (err) {
      console.error("Failed to parse auth from localStorage:", err);
    }
  },

  isLoggedIn: () => !!get().token,
}));
