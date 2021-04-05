import axiosClient from "../../api/axiosClient";
import { orderConstants } from "./constants";

export const getAllOrder = () => {
  return async (dispatch) => {
    const res = await axiosClient.get("/order");
    if (res.status === 200) {
      dispatch({
        type: orderConstants.GET_ORDER_SUCCESS,
        payload: { orders: res.data },
      });
    }
  };
};

export const checkOut = (id) => {
  return async (dispatch) => {
    const res = await axiosClient.post("/order/check-out", { id });
    if (res.status === 200) {
      return true;
    }
  };
};
