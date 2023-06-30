import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	amount: 0,
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	console.log(state);
	if (action.type === "ADD") {
		const updatedItems = state.items.concat(action.item); //dodaje nowy element i zwraca nową tablice
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		return {
			items: updatedItems,
			amount: action.item.amount,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = props => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = item => {
		dispatchCartAction({ type: "ADD", item: item });
	};

	const removeItemFromCartHandler = id => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
