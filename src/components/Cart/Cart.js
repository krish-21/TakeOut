// React Hooks & Packages
import { useContext } from "react";
import PropTypes from "prop-types";

// Context
import CartContext from "../../store/cart-context";

// CSS Modules
import styles from "./Cart.module.css";

// Custom Components
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const handleRemoveCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  const handleAddCartItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // ul with all individual CartItems
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={() => handleRemoveCartItem(item.id)}
          onAdd={() => handleAddCartItem(item)}
        />
      ))}
    </ul>
  );

  // Total Amount of all items in Cart
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  // Bool is Cart is Empty
  const isCartEmpty = !(cartCtx.items.length > 0);

  return (
    <Modal onClose={props.onClose}>
      {/* If Cart is empty, show message */}
      {/* Otherwise, render Cart Items List */}
      {isCartEmpty ? (
        <div className={styles["empty-text"]}>
          <h2>Tasty Food is Cooking</h2>
          <p>ADD ITEMS TO YOUR CART TO PLACE YOUR ORDER</p>
        </div>
      ) : (
        // ul with CartItems
        cartItems
      )}

      {/* Cart Summary */}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {/* Buttons to Close & Place Order */}
      <div className={styles.actions}>
        <button className={styles["button-alt"]} onClick={props.onClose}>
          Close
        </button>

        {/* If Cart is not empty, render Button to Place Order */}
        {!isCartEmpty && <button className={styles.button}>Place Order</button>}
      </div>
    </Modal>
  );
};

Cart.propTypes = {
  onClose: PropTypes.func,
};

export default Cart;
