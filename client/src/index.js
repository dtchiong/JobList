import ReactDOM from "react-dom";
import './index.css';
import "../semantic/dist/semantic.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root') // eslint-disable-line no-undef
);

