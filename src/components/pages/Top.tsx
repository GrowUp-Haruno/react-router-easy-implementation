import { VFC, memo } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../atoms/Header";

export const Top: VFC = memo(() => {
  const location = useLocation();
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <h2>トップページ</h2>
      <p>現在のパス："{location.pathname}"</p>
    </div>
  );
});
