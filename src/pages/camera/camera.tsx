import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NotFoundScreen from '../../components/not-found-screen/not-found-screen';
import ReviewsList from '../../components/reviews-list/reviews-list';
import SimilarCameras from '../../components/similar-cameras/similar-cameras';
import Preloader from '../../components/preloader/preloader';
import Tabs from '../../components/tabs/tabs';
import { AppRoute, MAX_RATING, DataLoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchCameraByIdAction, fetchReviewsAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getCameraById, getDataLoadingStatus, getSimilarCameras } from '../../store/camera-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import { reviewSort } from '../../util';
import ModalAddItem from '../../components/modal-add-item/modal-add-item';
import ModalAddItemSuccess from '../../components/modal-add-item-success/modal-add-item-success';

export default function Camera():JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = Number(params.id);
  const camera = useAppSelector(getCameraById);
  const similarCameras = useAppSelector(getSimilarCameras);
  const reviews = useAppSelector(getReviews);
  const reviewsSorted = reviews.slice().sort(reviewSort);
  const cameraLoadingStatus = useAppSelector(getDataLoadingStatus);
  const [selectedCamera, setSelectedCamera] = useState(camera);
  const [isModalAddItemActiv, setIsModalAddItemActive] = useState(false);
  const [isModalAddItemSuccess, setIsModalAddItemSuccess] = useState(false);

  const handleButtonAddItemClick = () => {
    setSelectedCamera(camera);
    setIsModalAddItemActive(true);
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    if (id === null) {
      return;
    }
    dispatch(fetchCameraByIdAction(id));
    dispatch(fetchSimilarCamerasAction(id));
    dispatch(fetchReviewsAction(id));
  }, [dispatch, id]);

  if (cameraLoadingStatus === DataLoadingStatus.Rejected) {
    return (
      <NotFoundScreen/>
    );
  }

  if (cameraLoadingStatus === DataLoadingStatus.Pending) {
    return (
      <Preloader />
    );
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>??????????????
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Root}>??????????????
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
                    <p className="visually-hidden">{`??????????????: ${camera.rating}`}</p>
                    <p className="rate__count"><span className="visually-hidden">?????????? ????????????:</span>{camera.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">????????:</span>{`${camera.price} ???`}</p>
                  <button onClick={handleButtonAddItemClick} className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>???????????????? ?? ??????????????
                  </button>
                  <Tabs camera={camera}/>
                </div>
              </div>
            </section>
          </div>
          {similarCameras.length !== 0 &&
          <div className="page-content__section">
            <SimilarCameras similarCameras={similarCameras} setSelectedCamera={setSelectedCamera} setIsModalAddItemActive={setIsModalAddItemActive}/>
          </div>}
          <div className="page-content__section">
            <ReviewsList reviews={reviewsSorted} id={id}/>
          </div>
        </div>
        {isModalAddItemActiv &&
        <ModalAddItem selectedCamera={selectedCamera} setIsModalAddItemActive={setIsModalAddItemActive} setIsModalAddItemSuccess={setIsModalAddItemSuccess}/>}
        {isModalAddItemSuccess &&
        <ModalAddItemSuccess setIsModalAddItemSuccess={setIsModalAddItemSuccess}/>}
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
