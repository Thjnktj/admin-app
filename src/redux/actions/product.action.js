import axios from "../../api/axiosClient";
import { productConstants } from "./constants";

export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axios.post(`/product`, form);
    if (res.status === 201) {
      return true;
    }
  };
};

export const getAllData = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_DATA_REQUEST });
    const res = await axios.get("/product/");
    if (res.status === 200) {
      const { products } = res.data;
      dispatch({
        type: productConstants.GET_ALL_DATA_SUCCESS,
        payload: { products },
      });
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    const res = await axios.post(`/product/update`, product);
    if (res.status === 201) {
      return true;
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const res = await axios.delete(`/product/${id}`);
    if (res.status === 200) {
      return true;
    }
  };
};
