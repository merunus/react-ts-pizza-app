import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        Error <span>404</span>
      </h1>
      <p>Unfortunately such page doesn't exists!</p>
    </div>
  );
};

export default NotFoundBlock;
