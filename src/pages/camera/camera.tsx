import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ReviewsList from '../../components/reviews-list/reviews-list';
import SimilarCameras from '../../components/similar-cameras/similar-cameras';
import Tabs from '../../components/tabs/tabs';
import { AppRoute, MAX_RATING } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchCameraByIdAction, fetchReviewsAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getCameraById, getSimilarCameras } from '../../store/camera-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import { reviewSort } from '../../util';

export default function Camera():JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = Number(params.id);
  const camera = useAppSelector(getCameraById);
  const similarCameras = useAppSelector(getSimilarCameras);
  const reviews2 = useAppSelector(getReviews);
  const reviews = reviews2.slice().sort(reviewSort);

  useEffect(() => {
    if (id === null) {
      return;
    }
    dispatch(fetchCameraByIdAction(id));
    dispatch(fetchSimilarCamerasAction(id));
    dispatch(fetchReviewsAction(id));
  }, [dispatch, id]);
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{camera.name}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x"`} />
                    <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x}} 2x`} width="560" height="480" alt={camera.name}/>
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera.name}</h1>
                  <div className="rate product__rate">
                    {Array.from({length: MAX_RATING}, (it, index) => (
                      <svg width="17" height="16" aria-hidden="true" key={`star-${index}`}>
                        <use xlinkHref={`#icon-${index < camera.rating ? 'full-' : ''}star`}></use>
                      </svg>
                    ))}
                    <p className="visually-hidden">{`Рейтинг: ${camera.rating}`}</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{`${camera.price} ₽`}</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <Tabs camera={camera}/>
                </div>
              </div>
            </section>
          </div>
          {similarCameras.length !== 0 &&
          <div className="page-content__section">
            <SimilarCameras similarCameras={similarCameras}/>
          </div>}
          <div className="page-content__section">
            <ReviewsList reviews={reviews} id={id}/>
          </div>
        </div>

      </main>
      <button className="up-btn" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
      <Footer />
    </div>
  );
}
