// React Hooks
import { createContext } from "react";

// Context for Cart
const CartContext = createContext({
  items: [],
  totalAmount: 0,
  // eslint-disable-next-line no-unused-vars
  addItem: (item) => {},
  // eslint-disable-next-line no-unused-vars
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
