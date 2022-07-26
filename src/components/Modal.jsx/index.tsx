import React, { useState, useRef, useEffect } from "react";
import styles from "./Modal.module.scss";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { selectPizzaData } from "../../redux/slices/pizza/selectors";
import { addItem } from "../../redux/slices/cart/slice";
import { selectCartItemById } from "../../redux/slices/cart/selectors";
import { toast } from "react-toastify";
import Stars from "../Stars";

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
};

type ToppingItem = {
  name: string;
  isChosen: boolean;
  price: number;
  img: string;
};

type PropsItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  rating: number;
  types: number[];
  sizes: number[];
  toppings: object[];
  count: number;
};

const Modal: React.FC<ModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { modalItem } = useSelector(selectPizzaData);
  const { id, title, imageUrl, price, type, size, rating, types, sizes } =
    modalItem;
  const cartItem = useSelector(selectCartItemById(id));
  const dispatch = useDispatch();

  const [chosenToppings, setChosenToppings] = useState<ToppingItem[]>([]);
  const [toppingMoney, setToppingMoney] = useState(0);

  const [toppings, setToppings] = useState([
    {
      name: "Ham",
      isChosen: false,
      price: 3.49,
      img: "https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A2BF1ABA95511EA084A0C3B6B6D",
    },
    {
      name: "Onions",
      isChosen: false,
      price: 1.59,
      img: "https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A23750CA95E11EA0849F0AA726B",
    },
    {
      name: "Mushrooms",
      isChosen: false,
      price: 1.39,
      img: "https://dodopizza-a.akamaihd.net/static/Img/Ingredients/000D3A23750CA95E11EA08476DCA479C",
    },
  ]);

  const onCloseModal = () => {
    setIsModalOpen(false);
    toppings.forEach((item) => (item.isChosen = false));
    setToppingMoney(0);
    setChosenToppings([]);
  };

  const onClickTopping = (name: string) => {
    const item = toppings.find((item) => item.name === name);
    if (item) item.isChosen = !item.isChosen;
    setToppings((prevValue) => {
      return [...prevValue];
    });
    if (item) {
      const { price } = item;

      item.isChosen
        ? setToppingMoney((prevValue) => prevValue + price)
        : setToppingMoney((prevValue) => prevValue - price);
    }
    if (item)
      item.isChosen
        ? setChosenToppings([...chosenToppings, { ...item }])
        : setChosenToppings(chosenToppings.filter((i) => i.name !== name));
  };

  const addToCart = (item: PropsItem) => {
    const newItem: PropsItem = {
      ...item,
      toppings: [...chosenToppings],
      price: (price + toppingMoney).toFixed(2),
    };
    // console.log(newItem);
    dispatch(addItem(newItem));
    toast("Pizza was added to the cart!", {
      autoClose: 500,
      type: "success",
    });
  };

  return (
    <div
      onClick={onCloseModal}
      className={isModalOpen ? styles.root : styles.hidden}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.container}>
        <div className={styles.pizzaImg}>
          <img src={imageUrl} alt="" />
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.details}>
            <h1>{title}</h1>
            <div style={{ transform: "translateX(-125px)", marginTop: "5px" }}>
              <Stars rating={rating} />
            </div>
            <span>
              {type}, {size} sm.
            </span>
            <h2>Add topings</h2>
          </div>
          <div className={styles.topingsContainer}>
            <ul>
              {toppings.map((item, index) => {
                const { img, name, price, isChosen } = item;
                return (
                  <li
                    onClick={() => onClickTopping(name)}
                    key={index}
                    className={isChosen ? styles.active : ""}
                  >
                    <span
                      style={{
                        opacity: `${isChosen === true ? "1" : "0"}`,
                      }}
                    >
                      <AiOutlineCheckCircle />
                    </span>
                    <img src={img} alt={name} />
                    <div>
                      <h4>{name}</h4>
                      <p>{price}$</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            onClick={() => addToCart(modalItem)}
            className="button button--outline button--add "
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add to cart for {(price + toppingMoney).toFixed(2)}$</span>
            {/* {addedCount > 0 && <i>{addedCount}</i>} */}
          </button>
        </div>
        <span onClick={onCloseModal} className={styles.closeBtn}>
          <GrClose />
        </span>
      </div>
    </div>
  );
};

export default Modal;
