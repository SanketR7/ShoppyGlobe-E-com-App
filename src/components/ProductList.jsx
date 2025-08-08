import React, { useState } from "react";
import ProductItem from "./ProductItem.jsx";
import useFetchProducts from "../hooks/FetchProducts.jsx";
import "./Styles.css";

export default function ProductList() {
  const {
    data: products,
    loading,
    error,
  } = useFetchProducts("https://dummyjson.com/products");
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
