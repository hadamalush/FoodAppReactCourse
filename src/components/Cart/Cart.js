import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = props => {
	const cartCtx = useContext(CartContext);

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map(item => (
				<li key={item.id}>
					<b>{item.name}</b> Amount: {item.amount}
				</li>
			))}
		</ul>
	);
	return (
		<Modal onClose={props.onHideCart}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{cartCtx.totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onHideCart}>
					Close
				</button>
				<button className={classes.button}>Order</button>
			</div>
		</Modal>
	);
};

export default Cart;
