import ReactFocusLock from 'react-focus-lock';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import useKeydown from '../../hooks/use-keydown';

type ModalAddItemSuccessProps = {
  setIsModalAddItemSuccess: (status: boolean) => void;
}
export default function ModalAddItemSuccess({setIsModalAddItemSuccess}: ModalAddItemSuccessProps): JSX.Element {
  useKeydown('Escape', () => {setIsModalAddItemSuccess(false); document.body.style.overflow = 'scroll';});
  return (
    <ReactFocusLock>
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div onClick={() => {setIsModalAddItemSuccess(false); document.body.style.overflow = 'scroll';}} className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Товар успешно добавлен в корзину</p>
            <svg className="modal__icon" width="86" height="80" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <div className="modal__buttons">
              <Link to={AppRoute.Root} onClick={() => {setIsModalAddItemSuccess(false); document.body.style.overflow = 'scroll';}} className="btn btn--transparent modal__btn">Продолжить покупки</Link>
              <Link to={AppRoute.Basket} onClick={() => {setIsModalAddItemSuccess(false); document.body.style.overflow = 'scroll';}} className="btn btn--purple modal__btn modal__btn--fit-width">Перейти в корзину</Link>
            </div>
            <button onClick={() => {setIsModalAddItemSuccess(false); document.body.style.overflow = 'scroll';}} className="cross-btn" type="button" aria-label="Закрыть попап">
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}
