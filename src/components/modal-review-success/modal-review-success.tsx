import useKeydown from '../../hooks/use-keydown';

type ModalReviewSuccessProps = {
  isModalReviewSuccessActive: boolean;
  setIsModalReviewSuccessActive: (status: boolean) => void;
}
export function ModalReviewSuccess({isModalReviewSuccessActive, setIsModalReviewSuccessActive}: ModalReviewSuccessProps): JSX.Element {
  useKeydown('Escape', () => {setIsModalReviewSuccessActive(false); document.body.style.overflow = 'scroll';});
  return (
    <div className={`modal modal--narrow ${isModalReviewSuccessActive ? 'is-active' : ''}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => setIsModalReviewSuccessActive(false)}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button onClick={() => {setIsModalReviewSuccessActive(false); document.body.style.overflow = 'scroll';}} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
            </button>
          </div>
          <button onClick={() => {setIsModalReviewSuccessActive(false); document.body.style.overflow = 'scroll';}} className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
