import RootRoute from "./RootRoute";
import DetailRoute from "./DetailRoute";
import { DetailRouteType, RouteType } from "../types/RouteType";

const routePlacement = (rootRoutes: Array<RouteType>, url: string = "") => {
  return rootRoutes.map((route) => {
    return Object.prototype.toString.call(route.children) === "[object Object]"
      ? RootRoute(route, url)
      : DetailRoute(route as DetailRouteType, url);
  });
};

export default routePlacement;
