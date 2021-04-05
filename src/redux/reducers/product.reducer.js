import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_DATA_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
