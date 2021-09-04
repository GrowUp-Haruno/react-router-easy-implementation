import { Route, Switch } from "react-router-dom";

import { DetailRouteType } from "../types/RouteType";
import routePlacement from "./RoutePlacement";

const DetailRoute = (routes: DetailRouteType, url: string = "") => {
  return (
    <Route
      key={routes.path}
      exact={routes.exact}
      path={`${url}${routes.path}`}
      render={({ match: { url } }) => (
        <Switch children={routePlacement(routes.children, url)} />
      )}
    />
  );
};

export default DetailRoute;
