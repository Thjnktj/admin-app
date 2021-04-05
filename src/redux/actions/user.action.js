import axiosClient from "../../api/axiosClient";
import { userConstansts } from "./constants";

export const getUser = () => {
  return async (dispatch) => {
    const res = await axiosClient.get("/admin/user");
    if (res.status === 200) {
      dispatch({
        type: userConstansts.GET_USER_SUCCESS,
        payload: {
          users: res.data.users,
        },
      });
    }
  };
};

export const updateRole = (user) => {
  return async (dispatch) => {
    const res = await axiosClient.post("/admin/role", user);
    if (res.status === 201) {
      return true;
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    const res = await axiosClient.delete(`/admin/${id}`);
    if (res.status === 200) {
      return true;
    }
  };
};
