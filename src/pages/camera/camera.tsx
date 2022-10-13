import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Review from '../../components/review/review';
import Tabs from '../../components/tabs/tabs';
import { AppRoute, MAX_RATING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraByIdAction, fetchReviewsAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getCameraById } from '../../store/camera-data/selectors';

export default function Camera():JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const id = Number(params.id);
  const camera = useAppSelector(getCameraById);

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
                    <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x}} 2x`} width="560" height="480" alt="Ретрокамера Das Auge IV"/>
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
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                <div className="product-similar__slider">
                  <div className="product-similar__slider-list">
                    <div className="product-card is-active">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x"/><img src="img/content/img9.jpg" srcSet="img/content/img9@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 4</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                        </div>
                        <p className="product-card__title">Фотоаппарат FastShot MR-5</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card is-active">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x"/><img src="img/content/img1.jpg" srcSet="img/content/img1@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 3</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
                        </div>
                        <p className="product-card__title">Ретрокамера «Das Auge IV»</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card is-active">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/img5.webp, img/content/img5@2x.webp 2x"/><img src="img/content/img5.jpg" srcSet="img/content/img5@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 5</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
                        </div>
                        <p className="product-card__title">Фотоаппарат Instaprinter P2</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/img4.webp, img/content/img4@2x.webp 2x"/>
                          <img src="img/content/img4.jpg" srcSet="img/content/img4@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 4</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                        </div>
                        <p className="product-card__title">Фотоаппарат FastShot MR-5</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/img3.webp, img/content/img3@2x.webp 2x"/><img src="img/content/img3.jpg" srcSet="img/content/img3@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 3</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
                        </div>
                        <p className="product-card__title">Ретрокамера «Das Auge IV»</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                    <div className="product-card">
                      <div className="product-card__img">
                        <picture>
                          <source type="image/webp" srcSet="img/content/img11.webp, img/content/img11@2x.webp 2x"/><img src="img/content/img11.jpg" srcSet="img/content/img11@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2"/>
                        </picture>
                      </div>
                      <div className="product-card__info">
                        <div className="rate product-card__rate">
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <svg width="17" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-full-star"></use>
                          </svg>
                          <p className="visually-hidden">Рейтинг: 5</p>
                          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
                        </div>
                        <p className="product-card__title">Фотоаппарат Instaprinter P2</p>
                        <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
                        </p>
                      </div>
                      <div className="product-card__buttons">
                        <button className="btn btn--purple product-card__btn" type="button">Купить
                        </button>
                        <a className="btn btn--transparent" href="#">Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                  <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                  <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <Review />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </div>
  );
}
