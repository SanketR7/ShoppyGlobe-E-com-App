import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice.jsx";
import "./Styles.css";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <p>
        {item.title} - {item.quantity} x ${item.price}
      </p>
      <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </div>
  );
}
