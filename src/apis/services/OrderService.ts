import axiosClient from "../axiosClient";
import { OrderRequest } from "../dto/Request";
import { Order, PaymentResponse } from "../dto/Response";
const API_Order = "orders";

const OrderService = {
  create: async (request: OrderRequest): Promise<PaymentResponse> => {
    return await axiosClient.post(`${API_Order}`, request);
  },

  getBySeller: async (sellerId): Promise<Order[]> => {
    return await axiosClient.get(`${API_Order}/seller/${sellerId}`);
  },

  updateStatus: async (orderID, status): Promise<Order> => {
    return await axiosClient.patch(`${API_Order}/${orderID}`, {
      status,
    });
  },
};

export default OrderService;
