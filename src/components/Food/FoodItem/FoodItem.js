// React Hooks & Packages
import { useContext } from "react";
import PropTypes from "prop-types";

// Context
import CartContext from "../../../store/cart-context";

// CSS Modules
import styles from "./FoodItem.module.css";

// Custom Components
import FoodItemFrom from "./FoodItemForm";

const FoodItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const handleAddToCart = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles["food-item"]}>
      {/* FoodItem Details */}
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>

      {/* Form to add item to Cart */}
      <div>
        <FoodItemFrom id={props.id} onAddToCart={handleAddToCart} />
      </div>
    </li>
  );
};

FoodItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
};

export default FoodItem;
