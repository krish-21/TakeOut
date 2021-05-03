// Packages
import PropTypes from "prop-types";

// CSS Modules
import styles from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={styles["cart-item"]}>
      {/* Individual Food Item */}
      <div>
        <h2>{props.name}</h2>
        <div className={styles.summary}>
          <span className={styles.amount}> x {props.amount}</span>
          <span className={styles.price}>{price}</span>
        </div>
      </div>

      {/* Buttons to remove & add items from Cart */}
      <div className={styles.actions}>
        <button className={styles["dec-button"]} onClick={props.onRemove}>
          -
        </button>
        <button className={styles["inc-button"]} onClick={props.onAdd}>
          +
        </button>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
  onRemove: PropTypes.func,
  onAdd: PropTypes.func,
};

export default CartItem;
