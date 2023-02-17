import React, {useEffect, useState} from 'react';
import ProductsItem from "./ProductsItem";
import {useTelegram} from "../hooks/useTelegram";
import './products.css'
import { useNavigate } from "react-router-dom";

const ProductsList = ({products, addedProducts, categories, changeCategories, curCat}) => {

  const {tg} = useTelegram();

  const [items,setItems] = useState([])

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

  const goToSingle = (id) => {
    navigate(`/products/${id}`)
  }

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Оформить заказ'
    })

    tg.onEvent('mainButtonClicked', goToFormPage)
    return () => {
      tg.offEvent('mainButtonClicked', goToFormPage)
    }
  }, [])

  useEffect(() => {
    if(products.length > 0) {
      const arr = products.filter(prod => curCat === 'all' ? { ...prod } :prod.category === curCat )
      setItems(arr)
    }
  }, [curCat,products])

  return (
      <>
        <div className={"products-category"}>
          <h4 className={"products-category-title"}>Категории: </h4>
          <div className="products-category-list">
            { categories.map(cat => {
                return (
                  <div onClick={() => changeCategories(cat.name)} key={cat.name} className={cat.selected ? 'products-category-item active' : 'products-category-item'}>
                    {cat.title}
                  </div>
                )
              })
            }
          </div>
        </div>
        <p className={"products-desc"}>Всего найдено {items?.length} товаров: </p>
        <div className={"products-list"}>
          {products?.length > 0 && items.map(item => <ProductsItem goToSingle={goToSingle} key={item.id} product={item} />)}
        </div>
      </>
  );
};

export default ProductsList;