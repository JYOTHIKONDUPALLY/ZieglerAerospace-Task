import Register from "./components/register";
import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/login";
import "./styles.css";
import { Route, Switch } from "react-router-dom";
export default function App() {
  return (
    <>
      <Header />
      <Register />
      {/* <Switch>
        <Route path="/Register">
          <Register />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
      </Switch> */}
      <Login />
      <Footer />
    </>
  );
}
