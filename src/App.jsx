import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

// Lazy Loading (Performance Optimization)
const ProductList = lazy(() => import("./components/ProductList.jsx"));
const ProductDetail = lazy(() => import("./components/ProductDetail.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));

export default function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
