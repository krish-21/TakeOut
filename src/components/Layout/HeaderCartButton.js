// React Hooks & Packages
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// Context
import CartContext from "../../store/cart-context";

// Custom Components
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCardButton = (props) => {
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  // Total number of individual Items in Cart
  const noOfCartItems = cartCtx.items.reduce(
    (currentNumber, item) => currentNumber + item.amount,
    0
  );

  const btnClasses = `${styles.button} ${isBtnHighlighted && styles.bump}`;

  // Side Effect for Added to Cart Animation
  useEffect(() => {
    if (!noOfCartItems) {
      return;
    }

    setIsBtnHighlighted(true);

    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
    }, 300);

    // Cleanup Function
    return () => {
      clearTimeout(timer);
    };
  }, [noOfCartItems]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      {/* Cart Icon */}
      <span className={styles.icon}>
        <CartIcon />
      </span>

      {/* Cart Text */}
      <span className={styles["cart-text"]}>Cart</span>

      {/* No. of items in Cart */}
      <span className={styles.badge}>{noOfCartItems}</span>
    </button>
  );
};

HeaderCardButton.propTypes = {
  onClick: PropTypes.func,
};

export default HeaderCardButton;
