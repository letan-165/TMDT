import axiosClient from "../axiosClient";
import { CategoryResponse } from "../dto/Response";
const API_CATEGORY = "categories";

const CategoryService = {
  findAll: async (current, pageSize): Promise<CategoryResponse> => {
    return await axiosClient.get(
      `${API_CATEGORY}?current=${current}&pageSize=${pageSize}`
    );
  },
};

export default CategoryService;
