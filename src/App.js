// React Hooks
import { useState } from "react";

// Context
import CartProvider from "./store/CartProvider";

//Custom Components
import Header from "./components/Layout/Header";
import Cart from "./components/Cart/Cart";
import Food from "./components/Food/Food";

const App = () => {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleHideCart = () => {
    setShowCart(false);
  };

  return (
    // Wrap for Components which need access to Cart Context
    <CartProvider>
      {/* Conditionally Render Cart */}
      {showCart && <Cart onClose={handleHideCart} />}

      {/* Header */}
      <Header onShowCart={handleShowCart} />

      {/* Main Content */}
      <main>
        <Food />
      </main>
    </CartProvider>
  );
};

export default App;
