import { Link } from 'react-router-dom';
import { APIRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getPromoCamera } from '../../store/cameras-data/selectors';

export default function Banner(): JSX.Element {
  const promoCamera = useAppSelector(getPromoCamera);
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, id} = promoCamera;
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
