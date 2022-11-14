import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { APIRoute, PAGE_DEFAULT, PAGE_STEP } from '../../const';

type PaginationPropsType = {
  pagesCount: number;
}

export default function Pagination({pagesCount}: PaginationPropsType):JSX.Element {
  const params = useParams();
  const pageId = Number(params.pageId);
  const [activePage, setActivePage] = useState(pageId);

  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {activePage !== PAGE_DEFAULT &&
        <li className="pagination__item">
          <Link onClick={() => setActivePage(activePage - PAGE_STEP)} className="pagination__link pagination__link--text" to={`${APIRoute.Catalog}/${activePage - PAGE_STEP}?${search}`}>Назад</Link>
        </li>}
        {Array.from({length: pagesCount}, (it, index) => (
          <li className="pagination__item" key={`pagination-${index}`}>
            <Link onClick={() => setActivePage(PAGE_STEP + index)} className={`pagination__link ${(activePage === (PAGE_STEP + index)) ? 'pagination__link--active' : ''}`} to={`${APIRoute.Catalog}/${PAGE_STEP + index}?${search}`}>{PAGE_STEP + index}</Link>
          </li>
        ))}
        {activePage !== pagesCount && pagesCount > 1 &&
        <li className="pagination__item">
          <Link onClick={() => setActivePage(activePage + PAGE_STEP)}className="pagination__link pagination__link--text" to={`${APIRoute.Catalog}/${activePage + PAGE_STEP}?${search}`}>Далее</Link>
        </li>}
      </ul>
    </div>
  );
}
