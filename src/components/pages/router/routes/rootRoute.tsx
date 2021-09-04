import { RouteType } from "../types/RouteType";
import { Top } from "../../Top";
import { usersRoute } from "./usersRoute";
import { Page404 } from "../../Page404";

export const rootRoute: Array<RouteType> = [
  // path: string　パス名(ルートの場合'/'と書く),

  // exact: boolean pathの一致条件[true=完全一致, false=部分一致],
  // childrenにRoute配列を入れる場合は必ずfalseを入れること

  // children: ReactNode | Array<RouteTypes> ReactコンポーネントまたはRoute配列
  // Reactコンポーネントを入れた場合は、pathを基にルート定義する
  // Route配列を入れた場合は、pathに対してネストのルートを定義することができる

  {
    path: "/",
    exact: true,
    children: <Top />
  },
  {
    path: "/users",
    exact: false,
    children: usersRoute
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];
