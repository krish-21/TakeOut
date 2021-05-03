// CSS Modules
import styles from "./TaglineCard.module.css";

const TaglineCard = () => {
  return (
    // Small Card for TagLine
    <section className={styles.summary}>
      <h2>
        <span className={styles["green-title"]}>Delicious Food</span>, Delivered
        to You
      </h2>
    </section>
  );
};

export default TaglineCard;
