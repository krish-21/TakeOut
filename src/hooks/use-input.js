import { useReducer } from "react";

//
const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    // change in value
    case "INPUT":
      return { value: action.payload, isTouched: state.isTouched };

    // no change in value, on change touched state
    case "BLUR":
      return { value: state.value, isTouched: true };

    // reset to inital state
    case "RESET":
      return initialInputState;

    // return old state, if no matching action
    default:
      return state;
  }
};

const useInput = (validateValue) => {
  // state management for input
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // validity
  const isValid = validateValue(inputState.value);

  // error
  const hasError = inputState.isTouched && !isValid;

  // value change
  const handleValueChange = (event) => {
    dispatch({ type: "INPUT", payload: event.target.value });
  };

  // input blur
  const handleInputBlur = () => {
    dispatch({ type: "BLUR" });
  };

  // reset
  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid,
    hasError,
    handleValueChange,
    handleInputBlur,
    reset,
  };
};

export default useInput;
