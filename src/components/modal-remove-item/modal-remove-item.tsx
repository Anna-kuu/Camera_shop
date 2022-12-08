import { useAppDispatch } from '../../hooks/use-app-dispatch';
import useKeydown from '../../hooks/use-keydown';
import { removeCamera } from '../../store/basket-data/basket-data';
import { Camera } from '../../types/cameras-type';

type ModalRemoveItemProps = {
  setIsModalRemoveActive: (status: boolean) => void;
  selectedCamera: Camera;
}

export default function ModalRemoveItem({setIsModalRemoveActive, selectedCamera}: ModalRemoveItemProps): JSX.Element {
  useKeydown('Escape', () => {setIsModalRemoveActive(false); document.body.style.overflow = 'scroll';});
  const dispatch = useAppDispatch();

  const handldeRemoveBtnClick = (camera: Camera) => {
    dispatch(removeCamera(camera));
    setIsModalRemoveActive(false);
    document.body.style.overflow = 'scroll';
  };
  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => {setIsModalRemoveActive(false); document.body.style.overflow = 'scroll';}}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`/${selectedCamera.previewImgWebp}, /${selectedCamera.previewImgWebp2x} 2x`} />
                <img src="img/content/img9.jpg" srcSet={`${selectedCamera.previewImg2x} 2x"`} width="140" height="120" alt={selectedCamera.name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{selectedCamera.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул: </span> <span className="basket-item__number">{selectedCamera.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{selectedCamera.type} {selectedCamera.category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
                <li className="basket-item__list-item">{selectedCamera.level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button onClick={() => handldeRemoveBtnClick(selectedCamera)} className="btn btn--purple modal__btn modal__btn--half-width" type="button">Удалить
            </button>
            <button className="btn btn--transparent modal__btn modal__btn--half-width" onClick={() => {setIsModalRemoveActive(false); document.body.style.overflow = 'scroll';}}>Продолжить покупки
            </button>
          </div>
          <button onClick={() => {setIsModalRemoveActive(false); document.body.style.overflow = 'scroll';}} className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
