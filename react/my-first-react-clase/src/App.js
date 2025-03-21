import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MyRouters from "./router/Router";

export default function App() {
  return (
    <BrowserRouter>
      <MyRouters />
    </BrowserRouter>
  );
}
