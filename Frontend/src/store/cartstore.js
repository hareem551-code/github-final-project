import { create } from "zustand";

const useCartStore = create((set) => ({
  // All products added to cart
  cart: [],

  // Add product to cart
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item.id === product.id
      );

      // If product already exists, increase quantity
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      // Add new product
      return {
        cart: [
          ...state.cart,
          {
            ...product,
            quantity: 1,
          },
        ],
      };
    }),

  // Increase product quantity
  increaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      ),
    })),

  // Decrease product quantity
  decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // Remove product completely
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // Remove everything from cart
  clearCart: () =>
    set({
      cart: [],
    }),

  // Get total number of products
  getCartCount: () => {
    const state = useCartStore.getState();

    return state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  },

  // Get total price
  getTotalPrice: () => {
    const state = useCartStore.getState();

    return state.cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  },
}));

export default useCartStore;