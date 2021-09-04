import { BrowserRouter } from "react-router-dom";
import PageRouter from "./components/pages/router/PageRouter";
import "./styles.css";

const App = () => (
  <BrowserRouter>
    <PageRouter />
  </BrowserRouter>
);

export default App;
