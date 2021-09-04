import { BrowserRouter } from "react-router-dom";
import PageRouter from "./components/pages/router/PageRouter";
import "./styles.css";

export const App = () => (
  <BrowserRouter>
    <PageRouter />
  </BrowserRouter>
);

