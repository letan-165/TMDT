import axiosClient from "../axiosClient";
import { Cart } from "../dto/Response";
const API_CART = "carts";

const CartService = {
  get: async (userID): Promise<Cart> => {
    return await axiosClient.get(`${API_CART}/me/${userID}`);
  },

  create: async (userId, productId, quantity): Promise<Cart> => {
    const items = [{ productId, quantity }];
    const request = { userId, items };
    return await axiosClient.post(`${API_CART}`, request);
  },

  updateQuantity: async (cartId, productId, quantity): Promise<Cart> => {
    const items = [{ productId, quantity }];
    console.log(items);
    return await axiosClient.patch(`${API_CART}/${cartId}`, { items });
  },

  delete: async (cartId, productId): Promise<string> => {
    return await axiosClient.delete(`${API_CART}/${cartId}`, {
      data: { productId },
    });
  },
};

export default CartService;
