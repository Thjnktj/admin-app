import axios from "../../api/axiosClient";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_REQUEST });
    const res = await axios.get("/category/");
    if (res.status === 200) {
      const { categories } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_SUCCESS,
        payload: { categories: categories },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_REQUEST });
    const res = await axios.post("/category", form);
    if (res.status === 201) {
      return true;
    }
  };
};

export const updateCategory = (form) => {
  return async (dispatch) => {
    const res = await axios.post("/category/update/", form);
    if (res.status === 201) {
      return true;
    }
  };
};

export const deleteCategory = (category) => {
  return async (dispatch) => {
    const res = await axios.post(`/category/delete`, category);
    if (res.status === 200) {
      return true;
    }
  };
};
