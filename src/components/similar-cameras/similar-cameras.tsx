import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APIRoute, AppRoute, MAX_RATING, SLIDER_DEFAULT, SLIDER_STEP } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInBasket } from '../../store/basket-data/selectors';
import { resetCounter } from '../../store/reviews-data/reviews-data';
import { Camera, Cameras } from '../../types/cameras-type';

type SimilarCamerasProps = {
  similarCameras: Cameras;
  setSelectedCamera: (selectedCamera: Camera) => void;
  setIsModalAddItemActiv: (status: boolean) => void;
}

export default function SimilarCameras({similarCameras, setSelectedCamera, setIsModalAddItemActiv}: SimilarCamerasProps):JSX.Element {
  const dispatch = useAppDispatch();
  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const handleButtonAddItemClick = (camera: Camera) => {
    setSelectedCamera(camera);
    setIsModalAddItemActiv(true);
    document.body.style.overflow = 'hidden';
  };
  const [sliderStart, setSliderStart] = useState(SLIDER_DEFAULT);
  const shownSimilarCameras = similarCameras.slice(sliderStart, (sliderStart + SLIDER_STEP));
  const similarCamerasSlider = shownSimilarCameras.map((camera) => {
    const isCameraInBasket = camerasInBasket?.find((cameraInBasket) => camera.id === cameraInBasket.camera.id);
    return (
      <div className="product-card is-active" key={`slider-${camera.id}`}>
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`}/>
            <img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name}/>
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            {Array.from({length: MAX_RATING}, (it, index) => (
              <svg width="17" height="16" aria-hidden="true" key={`star-${index}`}>
                <use xlinkHref={`#icon-${index < camera.rating ? 'full-' : ''}star`}></use>
              </svg>
            ))}
            <p className="visually-hidden">Рейтинг: {camera.rating}</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
          </div>
          <p className="product-card__title">{camera.name}</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>{camera.price.toLocaleString('ru')} ₽
          </p>
        </div>
        <div className="product-card__buttons">
          {isCameraInBasket ?
            <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>В корзине
            </Link>
            :
            <button onClick={() => handleButtonAddItemClick(camera)} className="btn btn--purple product-card__btn" type="button">Купить
            </button>}
          <Link onClick={() => dispatch(resetCounter())} className="btn btn--transparent" to={`${APIRoute.Cameras}/${camera.id}`}>Подробнее
          </Link>
        </div>
      </div>
    );}
  );
  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarCamerasSlider}
          </div>
          <button onClick={() => setSliderStart(sliderStart - SLIDER_STEP)} className="slider-controls slider-controls--prev" type="button"aria-label="Предыдущий слайд" disabled={sliderStart === SLIDER_DEFAULT}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button onClick={() => setSliderStart(sliderStart + SLIDER_STEP)} className="slider-controls slider-controls--next" aria-label="Следующий слайд" disabled={(similarCameras.length - sliderStart) <= SLIDER_STEP }>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
