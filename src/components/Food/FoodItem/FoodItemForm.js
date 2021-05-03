// React Hooks & Packages
import { useRef } from "react";
import Proptypes from "prop-types";

// CSS Modules
import styles from "./FoodItemForm.module.css";

// Custom Components
import Input from "../../UI/Input";

const FoodItemForm = (props) => {
  const amountInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredAmount = parseInt(amountInputRef.current.value.trim());
    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          required: true,
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

FoodItemForm.propTypes = {
  id: Proptypes.string,
  onAddToCart: Proptypes.func,
};

export default FoodItemForm;
