import { Link } from 'react-router-dom';
import { APIRoute, MAX_CAMERAS_OF_PAGE, MAX_RATING, PAGE_STEP } from '../../const';
import { getCameras } from '../../store/cameras-data/selectors';
import { useParams } from 'react-router-dom';
import { resetCounter } from '../../store/reviews-data/reviews-data';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

export default function CatalogCards():JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const pageId = Number(params.pageId);
  const cameras = useAppSelector(getCameras);
  const startArrayIndex = MAX_CAMERAS_OF_PAGE * (pageId - PAGE_STEP);
  const camerasSelected = cameras.slice(startArrayIndex, (startArrayIndex + MAX_CAMERAS_OF_PAGE));
  const camerasCatalog = camerasSelected.map((camera) => (
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
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link onClick={() => dispatch(resetCounter())} className="btn btn--transparent" to={`${APIRoute.Cameras}/${camera.id}`}>Подробнее
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
