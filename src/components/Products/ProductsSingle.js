import React, {useEffect, useState, useContext} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../../context";
import arrow from '../../images/arrow.png'
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import {useTelegram} from "../hooks/useTelegram";
import { useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from "swiper";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";

const ProductsSingle = ({products,moveBack,addedProducts}) => {

  const {onAdd,onRemove,addMore} = useContext(Context)

  const {tg} = useTelegram();

  const navigate = useNavigate()

  const [currentProduct, setCurrentProduct] = useState(null)
  let { id } = useParams();

  useEffect(() => {
    const product = products.filter(item => item.id === +id)
    setCurrentProduct(product)
  }, [products])

  const goToFormPage = () => {
    navigate('/form')
  }

  useEffect(() => {
    if(addedProducts?.length > 0) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [addedProducts])

  useEffect(() => {
    tg.MainButton.setParams({
      text: `Оформить заказ (${addedProducts.length} шт.)`
    })

    tg.onEvent('mainButtonClicked', goToFormPage)
    return () => {
      tg.offEvent('mainButtonClicked', goToFormPage)
    }
  }, [addedProducts])

  return (
    <div className={"singe-wrap"}>
      <p className={"single-back"} onClick={moveBack}>
        <img src={arrow} alt="вернуться назад"/>
        Вернуться назад
      </p>
      {currentProduct?.map(item => {
        const text = item.description.split('/').join('<br /><br />');
        return (
          <div key={item.id} className={"single-item"}>
            <div className="single-header">
              <div className="single-img">
                { item.additionalPhotos.length > 0
                    ? <Swiper slidesPerView={1} pagination={{clickable: true}} loop={true} modules={[Pagination]} >
                        {item.additionalPhotos.map( img => <SwiperSlide key={img} > <img src={img} alt={item.title} /></SwiperSlide> )}
                      </Swiper>
                    : <img src={item.img} alt={item.title} />
                }
              </div>
              <div className="single-info">
                <p className={"single-title"}>{item.title}</p>
                <div className="single-box">
                  <p className={"single-price"}>{item.price} 000 IDR</p>
                  {item.count && item.count > 0 ? <span>{item.count} шт.</span> : ''}
                </div>
                {!item.added
                  ? <button className={"products-add"} onClick={() => onAdd(item.id)}>Добавить</button>
                  : <div className={'products-more'}>
                    <button className={"products-btn decrease"} onClick={() => onRemove(item.id)}>-</button>
                    <button className={"products-btn increase"} onClick={() => addMore(item.id)}>+</button>
                  </div>
                }
              </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: text}} className="single-text" />
            {item.video && <div className={"single-video"}> <YoutubeEmbed embedId={item.video} /> </div>}
          </div>
        )
      })}
    </div>
  );
};

export default ProductsSingle;