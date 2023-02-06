import React, {useEffect} from 'react';
import ProductsItem from "./ProductsItem";
import {useTelegram} from "../hooks/useTelegram";
import './products.css'
import { useNavigate } from "react-router-dom";

const ProductsList = ({products,addedProducts}) => {

  const {tg} = useTelegram();

  const navigate = useNavigate()


  useEffect(() => {
    if(addedProducts?.length > 0) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [addedProducts])

  const goToFormPage = () => {
    navigate('/form')
  }

  useEffect(() => {
    tg.onEvent('mainButtonClicked', goToFormPage)
    return () => {
      tg.offEvent('mainButtonClicked', goToFormPage)
    }
  }, [])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Оформить заказ'
    })
  }, [])

  return (
    <div className={"products-list"}>
      success
      {/*{products?.length > 0 && products.map(item => <ProductsItem key={item.id} product={item} />)}*/}
      {/*<button onClick={() => goToFormPage()} >click</button>*/}
    </div>
  );
};

export default ProductsList;