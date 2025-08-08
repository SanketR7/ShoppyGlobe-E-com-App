import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Styles.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product details");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
