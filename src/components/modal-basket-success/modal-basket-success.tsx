import ReactFocusLock from 'react-focus-lock';
import { Link } from 'react-router-dom';
import { AppRoute, DataLoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import useKeydown from '../../hooks/use-keydown';
import { changeOrderPostLoadingStatus } from '../../store/basket-data/basket-data';

type ModalBasketSuccessProps = {
  setIsModalBasketSuccess: (status: boolean) => void;
}

export default function ModalBasketSuccess({setIsModalBasketSuccess}: ModalBasketSuccessProps): JSX.Element {
  const dispatch = useAppDispatch();
  useKeydown('Escape', () => {setIsModalBasketSuccess(false); document.body.style.overflow = 'scroll';});
  const closeModal = () => {
    setIsModalBasketSuccess(false);
    document.body.style.overflow = 'scroll';
    dispatch(changeOrderPostLoadingStatus(DataLoadingStatus.Idle));
  };
  return (
    <ReactFocusLock>
      <div className="modal is-active modal--narrow">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={closeModal}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <Link to={AppRoute.Root} onClick={closeModal}className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
              </Link>
            </div>
            <button onClick={closeModal} className="cross-btn" type="button" aria-label="Закрыть попап">
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
