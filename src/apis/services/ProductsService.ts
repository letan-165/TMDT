import axiosClient from "../axiosClient";
import { ProductRequest } from "../dto/Request";
import { Product, ProductsResponse } from "../dto/Response";

const API_PRODUCTS = "products";

const ProductsService = {
  save: async (request: ProductRequest): Promise<Product> => {
    try {
      return await axiosClient.post(`${API_PRODUCTS}`, request);
    } catch (e) {
      throw e;
    }
  },
  update: async (productID, request: ProductRequest): Promise<Product> => {
    try {
      return await axiosClient.patch(`${API_PRODUCTS}/${productID}`, request);
    } catch (e) {
      throw e;
    }
  },
  findAll: async (current, pageSize): Promise<ProductsResponse> => {
    try {
      return await axiosClient.get(
        `${API_PRODUCTS}?current=${current}&pageSize=${pageSize}`
      );
    } catch (e) {
      throw e;
    }
  },
  findOne: async (productID): Promise<Product> => {
    try {
      return await axiosClient.get(`${API_PRODUCTS}/${productID}`);
    } catch (e) {
      throw e;
    }
  },
  findByStore: async (storeID): Promise<Product[]> => {
    try {
      return await axiosClient.get(`${API_PRODUCTS}/store/${storeID}`);
    } catch (e) {
      throw e;
    }
  },
  findBySeller: async (sellerID): Promise<Product[]> => {
    try {
      return await axiosClient.get(`${API_PRODUCTS}/seller/${sellerID}`);
    } catch (e) {
      throw e;
    }
  },
  delete: async (productID): Promise<Product> => {
    try {
      return await axiosClient.delete(`${API_PRODUCTS}/${productID}`);
    } catch (e) {
      throw e;
    }
  },
};
export default ProductsService;
