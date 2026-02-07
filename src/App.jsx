import {  Routes, Route ,Navigate} from "react-router-dom";
import "./App.css";
import CartSidebar from "./components/cart_sidebar/ShoppingCartSidebar";
import { useState } from "react";
import Home_page from "./pages/home/Home_page";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Shop_page from "./pages/shop/Shop_page";
import About_page from "./pages/about/About_page";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/admin/Layout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Inquiries from './pages/admin/Inquiries';
import ContactForm from "./pages/contact/ContactForm";
import Single_product from "./pages/single_product/Single_product";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Notfond from "./components/notfond/Notfond";
import ScrollToTop from "./components/scrol/ScrollToTop";
import Customers from "./pages/admin/Customers";
import Settings from "./pages/admin/Settings";





function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <>
    
     <Navbar setIsCartOpen={setIsCartOpen} />
     <CartSidebar isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
       <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path="/shop" element={<Shop_page />} />
          <Route path="/about" element={<About_page />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/checkout" element={<Checkout />} />
           <Route path="/admin/login" element={<Login />} />
             <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="inquiries" element={<Inquiries />} />
                    <Route path="customers" element={<Customers />} />
<Route path="settings" element={<Settings />} />
                    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Dynamic product route - NEW */}
          <Route path="/product/:id" element={<Single_product />} />
          
          {/* Old static route - Keep for backward compatibility */}
          <Route path="/single_product" element={<Single_product />} />
          
          <Route path="/cart" element={<Cart/>} />
          {/* <Route path="*" element={<Notfond />} /> */}

          
        
        </Routes>
      <Footer />
      
    </>
    
  );
}

export default App;