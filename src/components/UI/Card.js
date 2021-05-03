// Packages
import PropTypes from "prop-types";

// Css Modules
import styles from "./Card.module.css";

// Wrapper Component for Consistent Styling
const Card = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
