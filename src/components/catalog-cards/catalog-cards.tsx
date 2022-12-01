import { Link } from 'react-router-dom';
import { APIRoute, MAX_RATING} from '../../const';
import { resetCounter } from '../../store/reviews-data/reviews-data';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { Camera, Cameras } from '../../types/cameras-type';

type CatalogCardsPropsType = {
  cameras: Cameras;
  setSelectedCamera: (selectedCamera: Camera) => void;
  setIsCatalogAddItemActiv: (status: boolean) => void;
}

export default function CatalogCards({cameras, setSelectedCamera, setIsCatalogAddItemActiv}: CatalogCardsPropsType):JSX.Element {
  const dispatch = useAppDispatch();
  const handleButtonAddItemClick = (camera: Camera) => {
    setSelectedCamera(camera);
    setIsCatalogAddItemActiv(true);
    document.body.style.overflow = 'hidden';
  };

  const camerasCatalog = cameras.map((camera) => (
    <div className="product-card" key={`product-card-${camera.id}`}>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`} />
          <img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {Array.from({length: MAX_RATING}, (it, index) => (
            <svg width="17" height="16" aria-hidden="true" key={`star-${index}`}>
              <use xlinkHref={`#icon-${index < camera.rating ? 'full-' : ''}star`}></use>
            </svg>
          ))}
          <p className="visually-hidden">{`Рейтинг: ${camera.rating}`}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${camera.price.toLocaleString('ru')} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button onClick={() => handleButtonAddItemClick(camera)} className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link onClick={() => dispatch(resetCounter())} className="btn btn--transparent" to={`${APIRoute.Cameras}/${camera.id}?tab=specification`}>Подробнее
        </Link>
      </div>
    </div>
  ));

  return (
    <div className="cards catalog__cards">
      {camerasCatalog}
    </div>
  );
}
