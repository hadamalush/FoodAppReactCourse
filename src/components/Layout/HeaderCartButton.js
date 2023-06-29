import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import CartProvider from "../../store/CartProvider";
import { useContext } from "react";

const HeaderCartButton = props => {
	const cc = useContext(CartContext);

	return (
		<button className={classes.button} onClick={props.onShowCart}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Card</span>
			<span className={classes.badge}>{cc.items.length}</span>
		</button>
	);
};

export default HeaderCartButton;
