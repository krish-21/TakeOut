// Dummmy Data
import DUMMY_FOOD from "../../utils/dummy-food";

// CSS Modules
import styles from "./AvailableFood.module.css";

// Custom Components
import Card from "../UI/Card";
import FoodItem from "./FoodItem/FoodItem";

const AvailableFood = () => {
  const foodList = DUMMY_FOOD.map((food) => (
    <FoodItem
      key={food.id}
      id={food.id}
      name={food.name}
      description={food.description}
      price={food.price}
    />
  ));
  return (
    <section className={styles.food}>
      <Card>
        {/* List of all Available Food */}
        <ul>{foodList}</ul>
      </Card>
    </section>
  );
};

export default AvailableFood;
