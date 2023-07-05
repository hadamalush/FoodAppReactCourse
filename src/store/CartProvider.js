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
		const existingCartItemIndex = state.items.findIndex(
			item => item.name === action.item.name
		);

		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItem;
		let updatedItems;
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;
		console.log(existingCartItem);

		if (existingCartItem) {
			updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItem = { ...action.item }; //dodaje nowy element
			updatedItems = state.items.concat(updatedItem);
		}

		return {
			items: updatedItems,
			amount: action.item.amount,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "REMOVE") {
		const itemToDeleteIndex = state.items.findIndex(
			item => item.id === action.id
		);
		const itemToDelete = state.items[itemToDeleteIndex];
		const updatedTotalAmount = state.totalAmount - itemToDelete.price;
		let updatedItems;

		if (itemToDelete.amount === 1) {
			updatedItems = state.items.filter(item => item.id !== action.id);
		} else {
			updatedItems = state.items;
			updatedItems[itemToDeleteIndex].amount -= 1;
		}

		return {
			items: updatedItems,
			amount: state.amount,
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
