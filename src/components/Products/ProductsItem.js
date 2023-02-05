import React, {useContext}  from 'react';
import {Context} from "../../context";

const ProductsItem = ({product}) => {

  const {onAdd,onRemove,addMore} = useContext(Context)

  return (
    <div className={"products-item"}>
      <img src={product.img} alt={product.title} />
      <h4 className={"products-title"}>{product.title}</h4>
      <p className={"products-price"}>{product.price} 000 IDR</p>
      {(product.count && product.count > 0) ? <span className={"products-count"}>{product.count}</span> : '' }
      <div className="products-actions">
        <a className={"products-link"} href={`/products/${product.id}`}>Подробнее</a>
        {!product.added
          ? <button className={"products-add"} onClick={() => onAdd(product.id)}>Добавить</button>
          : <div className={'products-more'}>
              <button className={"products-btn decrease"} onClick={() => onRemove(product.id)}>-</button>
              <button className={"products-btn increase"} onClick={() => addMore(product.id)}>+</button>
            </div>
        }
      </div>
    </div>
  );
};

export default ProductsItem;