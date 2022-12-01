import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type CatalogAddItemSuccessProps = {
  setIsCatalogAddItemSuccess: (status: boolean) => void;
}
export default function CatalogAddItemSuccess({setIsCatalogAddItemSuccess}: CatalogAddItemSuccessProps): JSX.Element {
  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div onClick={() => {setIsCatalogAddItemSuccess(false); document.body.style.overflow = 'scroll';}} className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link to={AppRoute.Root} onClick={() => {setIsCatalogAddItemSuccess(false); document.body.style.overflow = 'scroll';}} className="btn btn--transparent modal__btn">Продолжить покупки</Link>
            <button className="btn btn--purple modal__btn modal__btn--fit-width">Перейти в корзину</button>
          </div>
          <button onClick={() => {setIsCatalogAddItemSuccess(false); document.body.style.overflow = 'scroll';}} className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
