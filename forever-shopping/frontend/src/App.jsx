import { lazy, Suspense, useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ShopContext } from "./context/ShopContext";
import Breadcrumbs from "./components/Breadcrumbs";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const Verify = lazy(() => import("./pages/Verify"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// for notification product added or not to cart library header
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Simple guard wrapper for auth-required pages
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext);
  const location = useLocation();
  if (!token) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }
  return children;
};

const App = () => {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer theme="dark" />
        <Navbar />
        <SearchBar />
        <Breadcrumbs />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />

            {/* Auth routes */}
            <Route path="/login" element={<Login initialState="Login" />} />
            <Route path="/sign-up" element={<Login initialState="Sign Up" />} />
            <Route path="/register" element={<Navigate to="/sign-up" replace />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Guarded routes */}
            <Route
              path="/fash-shop/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/host-panel" element={<AdminPanel />} />

            {/* Orders & payment */}
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify" element={<Verify />} />

            {/* Not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default App;

