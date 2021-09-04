import { ReactNode } from "react";

export type DetailRouteType = {
  path: string;
  exact: boolean;
  children: Array<RouteType>;
};

export type RouteType = {
  path: string;
  exact: boolean;
  children: ReactNode | Array<RouteType>;
};
