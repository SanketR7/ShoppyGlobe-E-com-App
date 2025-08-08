import { useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";
import "./Styles.css";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
  );
}
