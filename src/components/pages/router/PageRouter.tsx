import { memo, VFC } from "react";
import { Switch } from "react-router-dom";

import routePlacement from "./api/RoutePlacement";
import { rootRoute } from "./routes/rootRoute";

const PageRouter: VFC = memo(() => (
  <Switch children={routePlacement(rootRoute)} />
));

export default PageRouter;
