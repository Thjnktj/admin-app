import { userConstansts } from "../actions/constants";

const initialState = {
  users: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstansts.GET_USER_SUCCESS:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
