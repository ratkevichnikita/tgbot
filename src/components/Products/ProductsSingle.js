import React, {useEffect, useState, useContext} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../context";
import arrow from '../../images/arrow.png'

const ProductsSingle = ({products,moveBack}) => {

  const {onAdd,onRemove,addMore} = useContext(Context)

  const [currentProduct, setCurrentProduct] = useState(null)
  let { id } = useParams();

  useEffect(() => {
    const product = products.filter(item => item.id === +id)
    setCurrentProduct(product)
  }, [products])

  return (
    <div className={"singe-wrap"}>
      <p className={"single-back"} onClick={moveBack}>
        <img src={arrow} alt="вернуться назад"/>
        Вернуться назад
      </p>
      {currentProduct?.map(item => {
        return (
          <div key={item.id} className={"single-item"}>
            <div className="single-header">
              <div className="single-img">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="single-info">
                <p className={"single-title"}>{item.title}</p>
                <p className={"single-price"}>{item.price} 000 IDR</p>
                {!item.added
                  ? <button className={"products-add"} onClick={() => onAdd(item.id)}>Добавить</button>
                  : <div className={'products-more'}>
                    <button className={"products-btn decrease"} onClick={() => onRemove(item.id)}>-</button>
                    <button className={"products-btn increase"} onClick={() => addMore(item.id)}>+</button>
                  </div>
                }
              </div>

            </div>
            <div className="single-text">
              Сборник заданий для деток в возрасте от 3 до 4 лет. <br/><br/>
              В книге всего 80 заданий с яркими и красочными иллюстрациями. Все задания разбиты на темы. Всего выбрано 4 темы: математика, мышление, внимание и моторика. <br/><br/>
              Задания в книге расположены таким образом, чтобы, можно было заниматься с ребенком по 15-20 минут в день, и при этом в полной мере охватить всю программу: потренировать память и мышление; уделить внимание таким важным областям знаний, как математика; подготовить руку к письму. <br/><br/>
              Всего в книге десять занятий. Каждое занятие занимает четыре странички. Не торопите малыша во время задания, старайтесь ему помогать, но в то же время не подавляйте инициативы. Не оценивайте результаты ребёнка слишком строго и по окончании работы обязательно его похвалите.
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default ProductsSingle;