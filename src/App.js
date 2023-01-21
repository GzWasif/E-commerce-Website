import {
  Routes,
  Route,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Products } from "./Pages/Products/Products";
import { Product } from "./Pages/Product/Product";
import { Cart } from "./Pages/Cart/Cart";
import { NotFound } from "./Pages/Error/Not-Found";
import { Category } from "./Pages/Category/category";
// import { Navbar } from "./components/navbar/navbar";
import { useState } from "react";
import SignUp from "./Pages/SignUp/signup";
import LogIn from "./Pages/LogIn/LogIn";

import { useCart } from "./context/cart";
// import { useLogInContext } from "./context/login";
import Protected from "./components/protected/protected";
// import user from "./Data/data";
import Profile from "./Pages/Profile/profile";
import { ModifiedNavbar } from "./components/modifiednavbar/ModifiedNavbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function App() {
  // localStorage.setItem("isLoggedIn", true);
  // localStorage.getItem("lastname");

  const [tuser] = useAuthState(auth);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const { cartItemCount } = useCart();

  // const { isLoggedIn, setIsLoggedIn } = useLogInContext();

  const onSearch = (searchQuery) => {
    navigate(`/products/?${createSearchParams({ q: searchQuery })}`);
  };
  return (
    <>
      {tuser && (
        <ModifiedNavbar onSearch={onSearch} cartItemCount={cartItemCount()} />
      )}

      <Routes>
        <Route path="/" element={<LogIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/products"
          element={
            <Protected>
              <Products />
            </Protected>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <Protected>
              <Product />
            </Protected>
          }
        />
        <Route
          path="/products/category/:category"
          element={
            <Protected>
              <Category />
            </Protected>
          }
        />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <Protected>
              <Profile user={user} />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
