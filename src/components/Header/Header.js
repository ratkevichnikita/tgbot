import React from 'react';
import Button from "../Button/Button";

const Header = () => {

  const tg = window.Telegram.WebApp;

  const onClose = () => {
    tg.close()
  }

  console.log('tg.initDataUnsafe',tg.initDataUnsafe)

  return (
    <header className="header">
      <Button onClick={onClose} >Закрыть</Button>
      <span>{tg.initDataUnsafe?.user?.username}</span>
    </header>
  );
};

export default Header;