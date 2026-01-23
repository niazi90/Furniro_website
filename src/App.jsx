import {  Routes, Route } from "react-router-dom";
import "./App.css";

import Home_page from "./pages/home/Home_page";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Shop_page from "./pages/shop/Shop_page";
import About_page from "./pages/about/About_page";

import ContactForm from "./pages/contact/ContactForm";
import Single_product from "./pages/single_product/Single_product";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";



// import About_page from "./pages/about_page/About_page";

function App() {
  
  return (
    <>
    
     <Navbar />
     
        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path="/shop" element={<Shop_page />} />
          <Route path="/about" element={<About_page />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* single product route  */}
             <Route path="/single_product" element={<Single_product />} />
             <Route path="/cart" element={<Cart/>} />
             <Route path="*" element={{}} />

          {/* <Route path="/cona" element={<about_page />} /> */}
        
        </Routes>
      <Footer />
      
    </>
    
  );
}

export default App;


