import axiosClient from "../axiosClient";
import { User } from "../dto/Response";
const API_USER = "users";

const UserService = {
  findById: async (userID): Promise<User> => {
    return await axiosClient.get(`${API_USER}/${userID}`);
  },
  save: async (user): Promise<User> => {
    return await axiosClient.patch(`${API_USER}/update/profile`, user);
  },
};

export default UserService;
