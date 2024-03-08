import { useRoutes } from "react-router-dom";
import { routeList } from "./routes/Routes";

const App = () => {
  const elements = useRoutes(routeList);

  return elements;
}

export default App;