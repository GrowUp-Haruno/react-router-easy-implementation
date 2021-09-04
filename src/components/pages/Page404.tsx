import { VFC, memo } from "react";
import { Header } from "../atoms/Header";

export const Page404: VFC = memo(() => {
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <h2>ページが見つかりません</h2>
    </div>
  );
});
