import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import CartPage from "./pages/customer/CartPage";
import CategoryPage from "./pages/customer/CategoryPage";
import { HomePage } from "./pages/customer/HomePage";
import IntroducePage from "./pages/customer/IntroducePage";
import ProductPage from "./pages/customer/ProductPage";
import ProfilePage from "./pages/customer/ProfilePage";
import SellerSignUp from "./pages/customer/SellerSignUp";
import DiscountPage from "./pages/seller/DiscountPage";
import OrderPage from "./pages/seller/OrderPage";
import RevenuePage from "./pages/seller/RevenuePage";
import SellerPage from "./pages/seller/SellerPage";
import { Paths } from "./Paths";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Paths.HOME} element={<HomePage />} />
        <Route path={Paths.CATEGORY} element={<CategoryPage />} />
        <Route path={Paths.INTRODUCE} element={<IntroducePage />} />
        <Route path={Paths.LOGIN} element={<LoginPage />} />
        <Route path={Paths.PROFILE} element={<ProfilePage />} />
        <Route path={`${Paths.PRODUCT}/:productID`} element={<ProductPage />} />
        <Route path={Paths.CART} element={<CartPage />} />
        <Route path={Paths.SELLER_SIGN_UP} element={<SellerSignUp />} />
        <Route path={Paths.SELLER} element={<SellerPage />} />
        <Route path={Paths.REVENUE} element={<RevenuePage />} />
        <Route path={Paths.ORDER} element={<OrderPage />} />
        <Route path={Paths.DISCOUNT} element={<DiscountPage />} />
      </Routes>
    </BrowserRouter>
  );
}
