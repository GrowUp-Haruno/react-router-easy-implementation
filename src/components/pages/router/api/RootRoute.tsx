import { Route } from "react-router-dom";

import { RouteType } from "../types/RouteType";

const RootRoute = (route: RouteType, url: string = "") => {
  return (
    <Route
      key={route.path}
      exact={route.exact}
      path={`${url}${route.path}`}
      children={route.children}
    />
  );
};

export default RootRoute;
