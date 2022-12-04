import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasInBascket } from '../../store/camera-data/selectors';
import FormSearch from '../form-search/form-search';

export default function Header(): JSX.Element {
  const countCamerasInBascket = useAppSelector(getCamerasInBascket).length;
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
            <li className="main-nav__item"><a className="main-nav__link" href="/">Каталог</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="/">Гарантии</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="/">Доставка</a>
            </li>
            <li className="main-nav__item"><a className="main-nav__link" href="/">О компании</a>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {countCamerasInBascket > 0 && <span className="header__basket-count">{countCamerasInBascket}</span>}
        </Link>
      </div>
    </header>
  );
}
