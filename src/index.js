import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cart";
// import { LogInContextProvider } from "./context/login";
// import { ModifiedNavbar } from "./components/modifiednavbar/ModifiedNavbar";
import { UserContextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// root.render(<ModifiedNavbar />);
