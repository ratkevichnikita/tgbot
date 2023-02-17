import React, {useContext}  from 'react';
import {Context} from "../../context";

const ProductsItem = ({product,goToSingle}) => {

  const {onAdd,onRemove,addMore} = useContext(Context)

  return (
    <div className={"products-item"}>
      <div className="products-img">
        <img src={product.img} alt={product.title} />
      </div>
      <div className="products-info">
        <h4 className={"products-title"}>{product.title}</h4>
        <p className={"products-price"}>{product.price} 000 IDR</p>
        {(product.count && product.count > 0) ? <span className={"products-count"}>{product.count}</span> : '' }
        <div className="products-actions">
          <button className={"products-link"} onClick={() => goToSingle(product.id)}>Подробнее</button>
          {!product.added
            ? <button className={"products-add"} onClick={() => onAdd(product.id)}>Добавить</button>
            : <div className={'products-more'}>
              <button className={"products-btn decrease"} onClick={() => onRemove(product.id)}>-</button>
              <button className={"products-btn increase"} onClick={() => addMore(product.id)}>+</button>
            </div>
          }
        </div>
      </div>

    </div>
  );
};

export default ProductsItem;