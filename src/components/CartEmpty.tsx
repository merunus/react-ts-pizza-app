import React from "react";
import cartEmptyImg from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Cart is empty <span>😕</span>
      </h2>
      <p>
        You haven't ordered any pizzas yet.
        <br />
        Please go back and fill your cart with more products!
      </p>
      <img className="cartEmptyImg" src={cartEmptyImg} alt="Empty cart" />
      <Link to="/react-ts-pizza-app" className="button button--black" >
        <span>Go back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
