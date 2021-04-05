import { orderConstants } from "../actions/constants";

const initialState = {
  orders: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.GET_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
