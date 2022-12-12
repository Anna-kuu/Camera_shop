import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CameraInBasket from '../../components/camera-in-basket/camera-in-basket';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ModalBasketSuccess from '../../components/modal-basket-success/modal-basket-success';
import ModalRemoveItem from '../../components/modal-remove-item/modal-remove-item';
import { AppRoute, DataLoadingStatus, PERCENT } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { couponPost, orderPost } from '../../store/api-actions';
import { getCamerasInBasket, getDiscount, getDiscountLoadingStatus, getOrderPostLoadingStatus } from '../../store/basket-data/selectors';
import { Camera } from '../../types/cameras-type';

export default function Basket(): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const discount = useAppSelector(getDiscount);
  const discountLoadingStatus = useAppSelector(getDiscountLoadingStatus);
  const orderPostLoadingStatus = useAppSelector(getOrderPostLoadingStatus);
  const [isModalRemoveActive, setIsModalRemoveActive] = useState(false);
  const [isModalBasketSuccess, setIsModalBasketSuccess] = useState(orderPostLoadingStatus === DataLoadingStatus.Fulfilled);
  const [promoValue, setPromoValue] = useState('');
  const [selectedCamera, setSelectedCamera] = useState({} as Camera);
  const totalCount = camerasInBasket.reduce((summ, {camera, cameraCount}) => summ + camera.price * cameraCount, 0);

  const handleInputPromoChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPromoValue(evt.target.value.replace(/^ +| +$|( ) +/g, '$1'));
  };

  const handleSubmitPromo = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(couponPost(promoValue));
  };

  const handleOrderBtnClick = () => {
    const camerasOrderId: number[] = [];
    camerasInBasket.forEach((item) => {
      for (let i = 1; i <= item.cameraCount; i++) {
        camerasOrderId.push(item.camera.id);
      }
    });
    const order = {
      camerasIds: camerasOrderId,
      coupon: promoValue ? promoValue : null,
    };
    dispatch(orderPost(order));
  };

  useEffect(() => {
    if (orderPostLoadingStatus === DataLoadingStatus.Fulfilled) {
      setIsModalBasketSuccess(true);
      document.body.style.overflow = 'hidden';
    }
  }, [orderPostLoadingStatus]);

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
          <section className="basket" data-testid={'basket'}>
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {camerasInBasket.map(({camera, cameraCount}) => (
                  <CameraInBasket key={`basket-item-${camera.id}`} camera={camera} cameraCount={cameraCount} setIsModalRemoveActive={setIsModalRemoveActive} setSelectedCamera={setSelectedCamera}/>))}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form onSubmit={handleSubmitPromo}>
                      <div className={`custom-input ${discountLoadingStatus === DataLoadingStatus.Rejected ? 'is-invalid' : ''} ${discountLoadingStatus === DataLoadingStatus.Fulfilled ? 'is-valid' : ''}`}>
                        <label><span className="custom-input__label">Промокод</span>
                          <input onChange={handleInputPromoChange} type="text" name="promo" placeholder="Введите промокод" value={promoValue} />
                        </label>
                        {discountLoadingStatus === DataLoadingStatus.Rejected && <p className="custom-input__error">Промокод неверный</p>}
                        {discountLoadingStatus === DataLoadingStatus.Fulfilled && <p className="custom-input__success">Промокод принят!</p>}
                      </div>
                      <button className="btn" type="submit" disabled={discountLoadingStatus === DataLoadingStatus.Pending}>Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{`${totalCount.toLocaleString('ru')} ₽`}</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={`basket__summary-value ${discountLoadingStatus === DataLoadingStatus.Fulfilled ? 'basket__summary-value--bonus' : ''}`}>{`${(discount * totalCount / PERCENT).toLocaleString('ru')} ₽`}</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{`${((PERCENT - discount) * totalCount / PERCENT).toLocaleString('ru')} ₽`}</span></p>
                  <button onClick={handleOrderBtnClick} className="btn btn--purple" type="submit" disabled={orderPostLoadingStatus === DataLoadingStatus.Pending} >Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {isModalRemoveActive && <ModalRemoveItem setIsModalRemoveActive={setIsModalRemoveActive} selectedCamera={selectedCamera}/>}
        {isModalBasketSuccess && <ModalBasketSuccess setIsModalBasketSuccess={setIsModalBasketSuccess} />}
      </main>
      <Footer />
    </div>
  );
}
