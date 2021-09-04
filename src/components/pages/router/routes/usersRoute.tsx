import { RouteType } from "../types/RouteType";
import { Page404 } from "../../Page404";
import { Users } from "../../Users";
import { User1 } from "../../User1";
import { User2 } from "../../User2";

export const usersRoute: Array<RouteType> = [
  {
    path: "/",
    exact: true,
    children: <Users />
  },
  {
    path: "/user1",
    exact: false,
    children: <User1 />
  },
  {
    path: "/user2",
    exact: false,
    children: <User2 />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];
