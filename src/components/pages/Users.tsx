import { VFC, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../atoms/Header";

const style = {
  margin: "0 18px"
};

export const Users: VFC = memo(() => {
  const location = useLocation();
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <h2>ユーザ一ページ</h2>
      <p>現在のパス："{location.pathname}"</p>
      <Link to={`${location.pathname}/user1`} style={style}>
        ユーザー１
      </Link>
      <Link to={`${location.pathname}/user2`} style={style}>
        ユーザー２
      </Link>
    </div>
  );
});
