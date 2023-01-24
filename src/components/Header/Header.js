import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../hooks/useTelegram";

const Header = () => {

const { user, onClose } = useTelegram();

console.log('user',user)

  return (
    <header className="header">
      <Button onClick={onClose} >Закрыть</Button>
      <span>{user.username}</span>
    </header>
  );
};

export default Header;