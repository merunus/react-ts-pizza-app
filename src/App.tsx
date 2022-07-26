import Header from "./components/Header";
import Error from "./pages/Error";
import Home from "./pages/Home";
import "./scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/react-pizza-app" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default App;
