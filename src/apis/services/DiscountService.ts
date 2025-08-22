import axiosClient from "../axiosClient";
import { Discount, DiscountResponse } from "../dto/Response";
const API_DISCOUNT = "discount";

const DiscountService = {
  findAll: async (current, pageSize): Promise<DiscountResponse> => {
    return await axiosClient.get(
      `${API_DISCOUNT}?current=${current}&pageSize=${pageSize}`
    );
  },
  findAllBySeller: async (sellerID): Promise<Discount[]> => {
    return await axiosClient.get(`${API_DISCOUNT}/seller/${sellerID}`);
  },
  delete: async (discountId) => {
    return await axiosClient.delete(`${API_DISCOUNT}/${discountId}`);
  },
  create: async (request: { name; code; value; createdBy }) => {
    return await axiosClient.post(`${API_DISCOUNT}`, request);
  },
  update: async (discountID, request: { name; code; value; createdBy }) => {
    return await axiosClient.patch(`${API_DISCOUNT}/${discountID}`, request);
  },
};

export default DiscountService;
