// React Hooks & Packages
import { useState, useContext } from "react";
import PropTypes from "prop-types";

// Context
import CartContext from "../../store/cart-context";

// CSS Modules
import styles from "./Cart.module.css";

// Custom Hooks
import useHTTP from "../../hooks/use-http";

// Custom Components
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CheckOut from "./Checkout";

const Cart = (props) => {
  // Cart Context
  const cartCtx = useContext(CartContext);

  // if cart is in checkout mode
  const [isCheckout, setIsCheckout] = useState(false);

  // if form was submitted, i.e, req to db was sent
  const [didSubmit, setDidSubmit] = useState(false);

  // Custom HTTP Hook
  // if req is still being processed, function to send request
  const { isLoading: isSubmitting, sendRequest: POST_FoodItem } = useHTTP();

  // remove item from cart by id
  const handleRemoveCartItem = (id) => {
    cartCtx.removeItem(id);
  };

  // add item into cart
  const handleAddCartItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // Total Amount of all items in Cart
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  // Bool is Cart is Empty
  const isCartEmpty = !(cartCtx.items.length > 0);

  // to make cart to checkout mode
  const handleOrder = () => {
    setIsCheckout(true);
  };

  // Form submission & sending req to db
  const handleConfirmOrder = async (userData) => {
    // reset submission state
    setDidSubmit(false);

    // data to be sent to db
    const data = JSON.stringify({
      user: userData,
      orderedItems: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
    });

    // function to run after successfull POST req
    const dataTransformer = (jsonData) => {
      console.log("Sucessful!");
      console.log(jsonData);

      // clear contents of cart
      cartCtx.clearCart();
    };

    // async POST req
    await POST_FoodItem(
      {
        url: "https://react-http-db2d4-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      },
      dataTransformer
    );

    // form submitted
    setDidSubmit(true);
  };

  // JSX for Cart Buttons
  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button-alt"]} onClick={props.onClose}>
        Close
      </button>

      {/* If Cart is not empty, render Button to Place Order */}
      {!isCartEmpty && (
        <button className={styles.button} onClick={handleOrder}>
          Place Order
        </button>
      )}
    </div>
  );

  // JSX for individual CartItems
  const cartItems = (
    <>
      <h2 className={styles.title}>Cart Summary</h2>
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
    </>
  );

  // JSX for Car Modal
  const cartModalContent = (
    <>
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
      {!isCartEmpty && (
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      )}

      {/* Buttons to Close & Place Order */}
      {/* Not in Checkout mode */}
      {!isCheckout && modalActions}

      {/* Confirm Order Form */}
      {/* In Check out Mode */}
      {isCheckout && (
        <CheckOut onClose={props.onClose} onConfirm={handleConfirmOrder} />
      )}
    </>
  );

  // JSX for form submitting state
  const isSubmittingCartModalContent = (
    <div className={styles["req-text"]}>
      <h2 className={styles["req-text-loading"]}>SENDING ORDER DATA</h2>
    </div>
  );

  // JSX for successful form submission
  const didSubmitCartModalContent = (
    <div className={styles["req-text"]}>
      <h2 className={styles["req-text-success"]}>SUCCESSFULLY PLACED ORDER!</h2>
      <div className={styles.actions}>
        <button className={styles["button-alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );

  // JSX for unsuccessful form submission
  const submitErrorCartModalContent = (
    <div className={styles["req-text"]}>
      <h2 className={styles["req-text-failure"]}>REQUEST FAILED</h2>
      <p className={styles["req-text-retry"]}>Please try again!</p>
      <div className={styles.actions}>
        <button className={styles["button-alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {/* Not Submitting & Not Submitted => Cart */}
      {!isSubmitting && !didSubmit && cartModalContent}

      {/* Submitting & Not Submitted => Temporary "Submitting" Message */}
      {isSubmitting && !didSubmit && isSubmittingCartModalContent}

      {/* Not Submitting & Submitted => Sucessfull Submission */}
      {!isSubmitting && didSubmit && didSubmitCartModalContent}

      {/* Submitting & Submitted => Unsuccessfull Submission */}
      {isSubmitting && didSubmit && submitErrorCartModalContent}
    </Modal>
  );
};

Cart.propTypes = {
  onClose: PropTypes.func,
};

export default Cart;
