import React from "react";
import Cart from "../components/Cart/Cart";

const CartContext = React.createContext({
	items: [],
	amount: 0,
	totalAmount: 0,
	addItem: item => {},
	removeItem: id => {},
});

export default CartContext;
