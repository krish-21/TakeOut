// React Hooks & Packages
import PropTypes from "prop-types";

// CSS Modules
import styles from "./Checkout.module.css";

//Custom Hooks
import useInput from "../../hooks/use-input";

// Helper Functions
const isNotEmpty = (value) => value.trim() !== "";
const isLenFive = (value) => value.trim().length === 5;

const Checkout = (props) => {
  // Custom Hook for Name Input
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameInputHasError,
    handleValueChange: handleNameChange,
    handleInputBlur: handleNameBlur,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  // Custom Hook for Street Input
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetInputHasError,
    handleValueChange: handleStreetChange,
    handleInputBlur: handleStreetBlur,
    reset: resetStreetInput,
  } = useInput(isNotEmpty);

  // Custom Hook for City Input
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityInputHasError,
    handleValueChange: handleCityChange,
    handleInputBlur: handleCityBlur,
    reset: resetCityInput,
  } = useInput(isNotEmpty);

  // Custom Hook for Zip Code Input
  const {
    value: zipCodeValue,
    isValid: zipCodeIsValid,
    hasError: zipCodeInputHasError,
    handleValueChange: handleZipCodeChange,
    handleInputBlur: handleZipCodeBlur,
    reset: resetZipCodeInput,
  } = useInput(isLenFive);

  // Derived state for form validity
  const formIsValid =
    nameIsValid && streetIsValid && cityIsValid && zipCodeIsValid;

  // Form Submission Function
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // Pass data to Cart
    props.onConfirm({
      name: nameValue.trim(),
      street: streetValue.trim(),
      city: cityValue.trim(),
      zipCode: zipCodeValue.trim(),
    });

    // Clear all inputs
    resetNameInput();
    resetStreetInput();
    resetCityInput();
    resetZipCodeInput();
  };

  // Dynamic classes for user form
  const nameClasses = `${styles.control} ${
    nameInputHasError && styles.invalid
  }`;
  const streetClasses = `${styles.control} ${
    streetInputHasError && styles.invalid
  }`;
  const cityClasses = `${styles.control} ${
    cityInputHasError && styles.invalid
  }`;
  const zipCodeClasses = `${styles.control} ${
    zipCodeInputHasError && styles.invalid
  }`;

  return (
    <>
      <h2 className={styles.title}>Delivery Address</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={nameClasses}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          />
          {nameInputHasError && <p>Name cannot be empty</p>}
        </div>

        <div className={streetClasses}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={streetValue}
            onChange={handleStreetChange}
            onBlur={handleStreetBlur}
          />
          {streetInputHasError && <p>Street cannot be empty</p>}
        </div>

        <div className={cityClasses}>
          <label htmlFor="City">City</label>
          <input
            type="text"
            id="City"
            value={cityValue}
            onChange={handleCityChange}
            onBlur={handleCityBlur}
          />
          {cityInputHasError && <p>City cannot be empty</p>}
        </div>

        <div className={zipCodeClasses}>
          <label htmlFor="zipcode">ZipCode</label>
          <input
            type="text"
            id="zipcode"
            value={zipCodeValue}
            onChange={handleZipCodeChange}
            onBlur={handleZipCodeBlur}
          />
          {zipCodeInputHasError && <p>ZIP Code must be valid</p>}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles["button-alt"]}
            onClick={props.onClose}
          >
            Close
          </button>
          <button
            type="submit"
            className={styles.submit}
            disabled={!formIsValid}
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

Checkout.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default Checkout;
