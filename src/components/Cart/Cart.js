import React from 'react';
import './cart.css';
import cartImage from '../../images/cart.svg'

const Cart = ({count}) => {
  return (
    <div className={"cart"}>
      {count ? <span className={"cart-count"}>{count}</span> : '' }
      <div className={"cart-img"}>
        <img src={cartImage} alt="Корзина"/>
      </div>
    </div>
  );
};

export default Cart;