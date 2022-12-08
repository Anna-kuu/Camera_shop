import { useAppDispatch } from '../../hooks/use-app-dispatch';
import useKeydown from '../../hooks/use-keydown';
import { addCameraToBasket } from '../../store/basket-data/basket-data';
import { Camera } from '../../types/cameras-type';

type ModalAddItemProps = {
  selectedCamera: Camera;
  setIsModalAddItemActiv: (status: boolean) => void;
  setIsModalAddItemSuccess: (status: boolean) => void;
}
export default function ModalAddItem({selectedCamera, setIsModalAddItemActiv, setIsModalAddItemSuccess}: ModalAddItemProps): JSX.Element {
  useKeydown('Escape', () => {setIsModalAddItemActiv(false); document.body.style.overflow = 'scroll';});
  const dispatch = useAppDispatch();
  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div onClick={() => {setIsModalAddItemActiv(false); document.body.style.overflow = 'scroll';}} className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`/${selectedCamera.previewImgWebp}, /${selectedCamera.previewImgWebp2x} 2x`} />
                <img src={selectedCamera.previewImg} srcSet={`${selectedCamera.previewImg2x} 2x"`} width="140" height="120" alt={selectedCamera.name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{selectedCamera.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул: </span>
                  <span className="basket-item__number">{selectedCamera.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{selectedCamera.type} {selectedCamera.category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
                <li className="basket-item__list-item">{selectedCamera.level} уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{`${selectedCamera.price.toLocaleString('ru')} ₽`}</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button onClick={() => {dispatch(addCameraToBasket(selectedCamera)); setIsModalAddItemActiv(false); setIsModalAddItemSuccess(true);}} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
          </div>
          <button onClick={() => {setIsModalAddItemActiv(false); document.body.style.overflow = 'scroll';}} className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
