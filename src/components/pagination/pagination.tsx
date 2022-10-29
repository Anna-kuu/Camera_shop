import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { APIRoute, MAX_CAMERAS_OF_PAGE, PAGE_DEFAULT, PAGE_STEP } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCamerasCount } from '../../store/cameras-data/selectors';

export default function Pagination():JSX.Element {
  const params = useParams();
  const pageId = Number(params.pageId);
  const [activePage, setActivePage] = useState(pageId);
  const camerasCount = useAppSelector(getCamerasCount);
  const pageCount = Math.ceil(camerasCount / MAX_CAMERAS_OF_PAGE);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {activePage !== PAGE_DEFAULT &&
        <li className="pagination__item">
          <Link onClick={() => setActivePage(activePage - PAGE_STEP)} className="pagination__link pagination__link--text" to={`${APIRoute.Catalog}/${activePage - PAGE_STEP}`}>Назад</Link>
        </li>}
        {Array.from({length: pageCount}, (it, index) => (
          <li className="pagination__item" key={`pagination-${index}`}>
            <Link onClick={() => setActivePage(PAGE_STEP + index)} className={`pagination__link ${(activePage === (PAGE_STEP + index)) ? 'pagination__link--active' : ''}`} to={`${APIRoute.Catalog}/${PAGE_STEP + index}`}>{PAGE_STEP + index}</Link>
          </li>
        ))}
        {activePage !== pageCount &&
        <li className="pagination__item">
          <Link onClick={() => setActivePage(activePage + PAGE_STEP)}className="pagination__link pagination__link--text" to={`${APIRoute.Catalog}/${activePage + PAGE_STEP}`}>Далее</Link>
        </li>}
      </ul>
    </div>
  );
}
