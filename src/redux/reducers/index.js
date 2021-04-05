import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import orderReducer from "./order.reducer";
import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  user: userReducer,
  order: orderReducer,
});

export default rootReducer;
