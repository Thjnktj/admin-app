import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  user: {
    fullname: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  message: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
        authenticate: true,
        authenticating: false,
      };
      break;
    case authConstants.SIGNUP_SUCCESS:
      state = {
        ...initState,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default reducer;
