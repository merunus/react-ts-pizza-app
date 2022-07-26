import React, { useState } from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    const [categories, setCategories] = useState([
      "All",
      "Meat",
      "Vegetarian",
      "Grill",
      "Spicy",
      "Closed",
    ]);

    return (
      <div className="categories">
        <ul>
          {categories.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => onClickCategory(index)}
                className={value === index ? "active" : ""}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default Categories;
