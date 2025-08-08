import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Styles.css";

export default function Header() {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <header>
      <h1>My Shop</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}
