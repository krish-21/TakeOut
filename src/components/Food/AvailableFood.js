import { useState, useEffect } from "react";

// CSS Modules
import styles from "./AvailableFood.module.css";

// Custom Hooks
import useHTTP from "../../hooks/use-http";

// Custom Components
import Card from "../UI/Card";
import FoodItem from "./FoodItem/FoodItem";

const AvailableFood = () => {
  // Array of food items
  const [food, setFood] = useState([]);

  // Custom HTTP Hook
  // if req is still being processed, function to send request
  const { isLoading, error: httpError, sendRequest: GET_Food } = useHTTP();

  // Side Effect to fetch food from db
  // runs every singl time, component is rendered
  useEffect(() => {
    // Transformer function to convert JSON data & set state
    const foodTransformer = (jsonData) => {
      const loadedFood = Object.keys(jsonData).map((name) => ({
        id: name,
        ...jsonData[name],
      }));

      setFood(loadedFood);
    };

    // GET Request
    GET_Food(
      {
        url: "https://react-http-db2d4-default-rtdb.asia-southeast1.firebasedatabase.app/food.json",
      },
      foodTransformer
    );
  }, [GET_Food]);

  // Page Loading
  if (isLoading) {
    return (
      <section className={styles["food-loading"]}>
        <p>Loading</p>
      </section>
    );

    // HTTP Error
  } else if (httpError) {
    return (
      <section className={styles["food-error"]}>
        <p>{httpError}</p>
      </section>
    );
  }

  // JSX for List of Available Food
  const foodList = food.map((food) => (
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
