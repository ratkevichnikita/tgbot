import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../hooks/useTelegram";
// import Cart from "../Cart/Cart";

const Header = ({addedProducts}) => {

const { user } = useTelegram();

  return (
    <header className="header">
      {/*<Cart count={addedProducts} />*/}
      {user && <span>{user?.username}</span>}
    </header>
  );
};

export default Header;