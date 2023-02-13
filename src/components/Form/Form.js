import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram";
import './form.css';
import {Context} from "../../context";

const Form = ({moveBack}) => {
  // состояния полей формы
  const [payment, setPayment] = useState('empty');
  const [location, setLocation] = useState('empty');
  // переменные для Корзины
  const [totalSum, setTotalSum] = useState(null);
  const [userName,setUserName] = useState('Пусто')
  const {tg, queryId, user} = useTelegram();

  const {uniqueProducts} = useContext(Context);

  const getTotalSum = (arr) => {
    const total = arr.reduce((acc,curr) => acc + curr.price, 0) + '000'
    const newTotal = total.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    setTotalSum(newTotal)
  }

  const onSendData = useCallback(() => {
    const productInfo = uniqueProducts.map(item => {
      return {
        title: item.title,
        count: item.count
      }
    })
    const data = {
      payment,
      location,
      totalSum,
      productInfo,
      userName,
      queryId
    }
    fetch('https://api.bslackers.ru/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    // tg.sendData(JSON.stringify(data));
  }, [payment, location, totalSum, uniqueProducts])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить'
    })
    if(uniqueProducts?.length > 0 ) {
      getTotalSum(uniqueProducts)
    }
    if(user?.username) {
      setUserName(user?.username)
    }

  }, [])

  useEffect(() => {
    if(location !== 'empty' && payment !== 'empty' ) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [payment,location])

  const onChangePayment = (e) => {
    setPayment(e.target.value)
  }

  const onChangeLocation = (e) => {
    setLocation(e.target.value)
  }

  return (
    <div className={"form"}>
      <div className="cart">
        <div className="cart-box">
          <h3>Ваш заказ</h3>
          <p onClick={moveBack}>Редактировать</p>
        </div>
        <div className="cart-list">
          { uniqueProducts?.map(item => {
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-inner">
                    <div className="cart-img">
                      <img src={`${item.img}`} alt={item.title} />
                    </div>
                    <div className="cart-title">
                      <p>{item.title}</p>
                    </div>
                  </div>
                  <span className="cart-item-amount">{item.count}x</span>
                  <div className="cart-price">{item.price} 000 IDR</div>
                </div>
              )
            })
          }

        </div>
        <div className="cart-total">
          {totalSum && `Итого: ${totalSum} IDR`}
        </div>
      </div>
      <h3>Введите ваши данные</h3>
      <div className="form-row">
        <p className={"form-label"}>Способ оплаты:</p>
        <select value={payment} onChange={onChangePayment} className={payment === 'empty' ? 'select mistake' : 'select good'}>
          <option value={'empty'}>Выберите способ оплаты</option>
          <option value={'Перевод на российскую карту'}>Перевод на российскую карту</option>
          <option value={'Перевод на карту Permata'}>Перевод на карту Permata</option>
          <option value={'Оплата наличными при получении'}>Оплата наличными при самовывозе</option>
          <option value={'Оплата в USDT на криптокошелек'}>Оплата в USDT на криптокошелек</option>
        </select>
      </div>
      <div className="form-row">
        <p className={"form-label"}>Выберите район:</p>
        <select value={location} onChange={onChangeLocation} className={location === 'empty' ? 'select mistake' : 'select good'}>
          <option value={'empty'}>Выберите район Бали</option>
          <option value={'Чангу'}>Чангу</option>
          <option value={'Семиньяк'}>Семиньяк</option>
          <option value={'Кута'}>Кута</option>
          <option value={'Убуд'}>Убуд</option>
          <option value={'Нуса-дуа'}>Нуса-дуа</option>
          <option value={'Санур'}>Санур</option>
          <option value={'Букит'}>Букит</option>
        </select>
      </div>
    </div>
  );
};

export default Form;