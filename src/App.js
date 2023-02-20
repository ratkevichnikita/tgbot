import React from "react";
import {useEffect, useState} from "react";
import {useTelegram} from "./components/hooks/useTelegram";
import {Route, Routes, useNavigate} from 'react-router-dom';
import ProductsList from "./components/Products/ProductsList";
import Form from "./components/Form/Form";
import {products} from './db.js'
import {Context} from "./context";
import ProductsSingle from "./components/Products/ProductsSingle";

function App() {

  const navigate = useNavigate()

  const { tg } = useTelegram();

  const [productsList, setProductsList] = useState([]);

  const [categories, setCategories] = useState([]);

  const [curCat, setCurCat] = useState('all')

  const [addedProducts, setAddedProducts] = useState([]);

  const [uniqueProducts, setUniqueProducts] = useState([]);

  useEffect(() => {
    if(addedProducts?.length > 0) {
      const countedProducts = addedProducts.map((item,index,arr) => {
        let count = 0;
        const func = (element) => {
          const y = arr.filter(el => el.id === element.id)
          count = y.length;
          return {
            ...element,
            count,
            price: count * +element.price
          }
        }
        return func(item)
      })
      const uniqueAddedProducts = [...new Map(countedProducts.map(m => [m.id, m])).values()];
      setUniqueProducts(uniqueAddedProducts)
    } else {
      setUniqueProducts([])
    }
  }, [addedProducts])

  const productsObserver = (id,count,added) => {
    const productsNew = productsList.map(item => {
      if(item.id === id) {
        return {
          ...item,
          added,
          count
        }
      } else {
        return {...item}
      }
    })
    setProductsList(productsNew);
  };

  const onAdd = (id) => {
    let data = [...addedProducts];
    productsList.forEach(item => {
      if(item.id === id) {
        data.push(item)
      }
    })
    productsObserver(id,1,true)
    setAddedProducts(data)
  }
  const onRemove = (id) => {
    let data = [];
    const currentProdIndex = addedProducts.findIndex(item => item.id === id);
    if(currentProdIndex !== -1) {
      data = addedProducts.filter((item,index) => index !== currentProdIndex)
    }
    const hasProduct = data.some(item => item.id === id);
    const count = data.filter(item => item.id === id).length;
    productsObserver(id,count, hasProduct)
    setAddedProducts(data)
  }
  const addMore = (id) => {
    let data = [...addedProducts];
    let currentProduct = data.find(item => item.id === id)
    data.push(currentProduct)
    const count = data.filter(item => item.id === id).length;
    productsObserver(id, count,true)
    setAddedProducts(data)
  }
  const moveBack = () => navigate('/');
  const changeCategories = (catName) => {
    const changedCat = categories.map(cat => {
      return {...cat, selected: catName === cat.name}
    })
    setCurCat(catName)
    setCategories(changedCat)
  }

  useEffect(() => {
    tg.ready();
    if(products.length > 0 ) {
      setProductsList(products);
      const categories = products.map(item => {
        const title = item.category === 'toys' ? 'Игрушки' : 'Книги'
        return {
          name: item.category,
          title,
          selected: false
        }
      })
      categories.unshift({ name:'all',title:'Все',selected: true })
      const uniqueCategories = [...new Map(categories.map(m => [m.name, m])).values()]
      setCategories(uniqueCategories)
    }
  }, [])
  return (
    <div className="App">
      <div className="wrapper">
        <Context.Provider value={{onAdd,onRemove,addMore,uniqueProducts}}>
          <Routes>
            <Route path={'/'} exact element={<ProductsList changeCategories={changeCategories} curCat={curCat} categories={categories} products={productsList} addedProducts={addedProducts} />} />
            <Route path={'/form'} element={<Form moveBack={moveBack} uniqueProducts={uniqueProducts} />} />
            <Route exact path={'/products/:id'} element={<ProductsSingle moveBack={moveBack} addedProducts={addedProducts} products={productsList} />} />
          </Routes>
        </Context.Provider>
        <button onClick={() => navigate('/form')} >click</button>
      </div>
    </div>
  );
}

export default App;
