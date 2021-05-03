// React Hooks & Packages
import { useReducer } from "react";
import PropTypes from "prop-types";

// Context
import CartContext from "./cart-context";

// Default Value for Cart
const defaultCart = {
  items: [],
  totalAmount: 0,
};

// Reducer function for Cart
const cartReducer = (state, action) => {
  switch (action.type) {
    // add Item to Cart
    case "ADD_ITEM": {
      // update Cart Total
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      // extract index of item in cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      // extract item from cart
      const existingItem = state.items[existingItemIndex];

      let updatedItems;

      if (existingItem) {
        // update extracted item
        const updatedCartItem = {
          ...existingItem,
          amount: existingItem.amount + action.payload.amount,
        };

        // add updated item to items array
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedCartItem;
      } else {
        // add new item to items array
        updatedItems = state.items.concat(action.payload);
      }

      // return new updated state
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    //Remove Item from Cart
    case "REMOVE_ITEM": {
      // extract index of item in cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      // extract item from cart
      const existingItem = state.items[existingItemIndex];

      // update Cart Total
      let updatedTotalAmount = state.totalAmount - existingItem.price;
      updatedTotalAmount < 0 ? (updatedTotalAmount = 0) : true;

      let updatedItems;

      if (existingItem.amount === 1) {
        // remove item from items array
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        // update extracted item
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };

        // add updated item to items array
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      }

      // return new updated state
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    // return old state if no matching action
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

  const handleAddItem = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  };

  const handleRemoveItem = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", payload: id });
  };

  // connect state and context
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartProvider;
