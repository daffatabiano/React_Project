import { useRoutes } from 'react-router-dom';
import { routeList } from './routes';
const App = () => {
    const elements = useRoutes(routeList);

    return elements;
};

export default App;
