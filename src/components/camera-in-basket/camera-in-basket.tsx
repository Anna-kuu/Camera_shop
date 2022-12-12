import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { changeCameraCount } from '../../store/basket-data/basket-data';
import { Camera } from '../../types/cameras-type';
const MIN_CAMERA_COUNT = '1';
const MAX_CAMERA_COUNT = '99';
const CAMERA_COUNT_STEP = 1;

type CameraInBasketPrpos = {
  camera: Camera;
  cameraCount: number;
  setIsModalRemoveActive: (status: boolean) => void;
  setSelectedCamera: (selectedCamera: Camera) => void;
}
export default function CameraInBasket({camera, cameraCount, setIsModalRemoveActive, setSelectedCamera}: CameraInBasketPrpos):JSX.Element {
  const [cameraCountInput, setCameraCountInput] = useState(String(cameraCount));
  const dispatch = useAppDispatch();
  const totalCount = () => {
    if (cameraCount) {
      return camera.price * cameraCount;
    }
    return camera.price;
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) <= 0) {
      setCameraCountInput('');
      return;
    }
    if (Number(evt.target.value) > 99) {
      setCameraCountInput(MAX_CAMERA_COUNT);
      dispatch(changeCameraCount({id: camera.id, value: Number(MAX_CAMERA_COUNT)}));
      return;
    }
    setCameraCountInput(evt.target.value);
    dispatch(changeCameraCount({id: camera.id, value: Number(evt.target.value)}));
  };

  const handleInputBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.value) {
      setCameraCountInput(MIN_CAMERA_COUNT);
      dispatch(changeCameraCount({id: camera.id, value: Number(MIN_CAMERA_COUNT)}));
    }
  };

  const handleDecreaseBtnClick = () => {
    const cameraCountDecrease = Number(cameraCountInput) - CAMERA_COUNT_STEP;
    setCameraCountInput(String(cameraCountDecrease));
    dispatch(changeCameraCount({id: camera.id, value: cameraCountDecrease}));
  };

  const handleIncreaseBtnClick = () => {
    const cameraCountIncrease = Number(cameraCountInput) + CAMERA_COUNT_STEP;
    setCameraCountInput(String(cameraCountIncrease));
    dispatch(changeCameraCount({id: camera.id, value: cameraCountIncrease}));
  };

  const handleRemoveItemClick = (selectedCamera: Camera) => {
    setIsModalRemoveActive(true);
    document.body.style.overflow = 'hidden';
    setSelectedCamera(selectedCamera);
  };

  return (
    <li className="basket-item" data-testid="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
          <img src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`} width="140" height="120" alt={camera.name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул: </span>
            <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{camera.type} {camera.category === 'Фотоаппарат' ? 'фотокамера' : 'видеокамера'}</li>
          <li className="basket-item__list-item">{camera.level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{`${camera.price.toLocaleString('ru')} ₽`}</p>
      <div className="quantity">
        <button onClick={handleDecreaseBtnClick} className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" disabled={Number(cameraCountInput) <= 1}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input onChange={handleInputChange} onBlur={handleInputBlur} type="number" id="counter1" value={cameraCountInput} min="1" max="99" aria-label="количество товара" />
        <button onClick={handleIncreaseBtnClick} className="btn-icon btn-icon--next" aria-label="увеличить количество товара" disabled={Number(cameraCountInput) >= 99}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{`${totalCount().toLocaleString('ru')} ₽`}</div>
      <button onClick={() => handleRemoveItemClick(camera)} className="cross-btn" type="button" aria-label="Удалить товар">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
