import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./layouts/Sidebar";
import Signin from "./layouts/Signin";
import { isUserLogin } from "./redux/actions";
import { getAllCategory } from "./redux/actions/category.action";
import { getAllOrder } from "./redux/actions/order.action";
import { getAllData } from "./redux/actions/product.action";
import { getUser } from "./redux/actions/user.action";
import { routes } from "./routes/index";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogin());
    }
    dispatch(getUser());
    dispatch(getAllData());
    dispatch(getAllOrder());
    dispatch(getAllCategory());
  }, [auth, dispatch]);

  return (
    <div className="App">
      <Sidebar>
        <Switch>
          {routes.map((route, index) => {
            return (
              <PrivateRoute
                key={index}
                path={route.root + route.path}
                exact={route.exact}
                component={route.component}
              />
            );
          })}
          <Route to="/admin/signin" component={Signin} />
        </Switch>
      </Sidebar>
    </div>
  );
}

export default App;
