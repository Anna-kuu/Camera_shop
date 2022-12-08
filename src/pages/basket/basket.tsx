import { Link } from 'react-router-dom';
import CameraInBasket from '../../components/camera-in-basket/camera-in-basket';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInBasket } from '../../store/basket-data/selectors';
//import { useAppSelector } from '../../hooks/use-app-selector';
//import { getCamerasInBascket } from '../../store/basket-data/selectors';

export default function Basket():JSX.Element {
  /*const camerasInBasket = useAppSelector(getCamerasInBascket);
  const a = [{id: 1, count: 2}, {id: 2, count: 1}, {id: 5, count:3}];
  // eslint-disable-next-line prefer-const
  let b: number[] = [];
  a.map((v) => Array.prototype.push.apply(b, Array(v.count).fill(v.id)));
  console.log(a);
  console.log(b);*/
  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const totalCount = camerasInBasket.reduce((summ, {camera, cameraCount}) => summ + camera.price * cameraCount, 0);
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
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {camerasInBasket.map(({camera, cameraCount}) => (
                  <CameraInBasket camera={camera} cameraCount={cameraCount}/>))}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{`${totalCount.toLocaleString('ru')} ₽`}</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
