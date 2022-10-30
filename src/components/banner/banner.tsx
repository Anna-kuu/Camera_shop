import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchPromoCameraAction } from '../../store/api-actions';
import { getPromoCamera } from '../../store/promo-data/selectors';

export default function Banner(): JSX.Element {
  const promoCamera = useAppSelector(getPromoCamera);
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, id} = promoCamera;
  const dispatch = useAppDispatch
  ();

  useEffect(() => {
    dispatch(fetchPromoCameraAction());
  }, [dispatch]);
  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`} />
        <img src={previewImg} srcSet={`/${previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${APIRoute.Cameras}/${id}`}>Подробнее</Link>
      </p>
    </div>
  );
}
