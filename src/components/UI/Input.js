// React Functions & Packages
import { forwardRef } from "react";
import PropTypes from "prop-types";

// CSS Modules
import styles from "./Input.module.css";

// Ref forwarder from Custom <Input /> Component
const Input = forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label className={styles.label} htmlFor={props.input.id}>
        {props.label}
      </label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  input: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string,
    defaultValue: PropTypes.string,
    required: PropTypes.bool,
  }),
};

Input.displayName = "Button";

export default Input;
