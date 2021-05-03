// Packages
import Proptypes from "prop-types";

// Assets
import foodImage from "../../assets/food-table.jpeg";

// CSS Modules
import styles from "./Header.module.css";

// Custom Components
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      {/* Header with Title & Cart */}
      <header className={styles.header}>
        <h1 className={styles["big-title"]}>
          Take<span className={styles["green-title"]}>Out</span>
        </h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>

      {/* Top Level Image */}
      <div className={styles["main-img"]}>
        <img src={foodImage} alt="A table full of delicious food" />
      </div>
    </>
  );
};

Header.propTypes = {
  onShowCart: Proptypes.func,
};

export default Header;
