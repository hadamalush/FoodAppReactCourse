import Input from "../../UI/Input";
import CartContext from "../../../store/cart-context";
import { useState, useContext } from "react";
import classes from "./MealItemForm.module.css";

const MealItemForm = props => {
	const [amountMeals, setAmountMeals] = useState(1);
	const cc = useContext(CartContext);
	const changeAmountHandler = event => {
		setAmountMeals(event.target.value);
	};

	const onSubmit = event => {
		event.preventDefault();
		const item = {
			id: props.id,
			name: props.name,
			price: props.price * amountMeals,
		};
		cc.addItem(item);
	};
	return (
		<form className={classes.form} onSubmit={onSubmit}>
			<Input
				label='Amount'
				input={{
					id: "amount_" + props.id,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
				onChange={changeAmountHandler}
			/>
			<button>+ Add</button>
		</form>
	);
};

export default MealItemForm;
