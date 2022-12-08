import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInBasket } from '../../store/basket-data/selectors';
import FormSearch from '../form-search/form-search';

export default function Header(): JSX.Element {
  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const countCamerasInBasket = camerasInBasket.reduce((summ, {cameraCount}) => summ + cameraCount, 0);

  return (
    <header className="header" id="header">
      <div className="container">
        <a className="header__logo" href="index.html" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </a>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Root}>Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Root}>Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Root}>Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Root}>О компании</Link>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {countCamerasInBasket > 0 && <span className="header__basket-count">{countCamerasInBasket}</span>}
        </Link>
      </div>
    </header>
  );
}
