import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MyRouters from "./router/Router";
import Menu from "./page/base/Menu";
import { UserContextProvider } from "./context/user-context"; 

export default function App() {
  return (
    <UserContextProvider> 
      <BrowserRouter>
        <Menu />
        <MyRouters /> 
      </BrowserRouter>
    </UserContextProvider>
  );
}
