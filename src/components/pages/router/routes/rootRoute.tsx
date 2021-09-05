// 設定データの型定義
import { RouteType } from "../types/RouteType";

// ページコンポーネント
import { Top } from "../../Top";
import { Page404 } from "../../Page404";

// ネストの設定データ
import { usersRoute } from "./usersRoute";

export const rootRoute: Array<RouteType> = [
  // path: string　パス名

  // exact: boolean
  // childrenにArray<RouteTypes>型のデータを入れる場合、必ずfalseを入れること

  // children: ReactNode | Array<RouteTypes> 
  // ReactNode型のデータを入れた場合、pathを基にページを設定する
  // Array<RouteTypes>型のデータを入れた場合、pathに対してネストを設定する

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
