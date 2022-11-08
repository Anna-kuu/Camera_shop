import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import CatalogCards from '../../components/catalog-cards/catalog-cards';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import { OrderType, SortType, QueryParams } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchCamerasAction, fetchCamerasOfMinMaxPrice } from '../../store/api-actions';

export default function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const pageId = Number(params.pageId);
  const [searchParams, setSeachParams] = useSearchParams();

  const paramsSort = useMemo(() => ({
    _sort: String(searchParams.get(QueryParams.Sort)),
    _order: String(searchParams.get(QueryParams.Order)),
  }), [searchParams]);

  if (searchParams.has(QueryParams.Sort) && (!searchParams.has(QueryParams.Order))) {
    searchParams.set(QueryParams.Order, OrderType.Asc);
    setSeachParams(searchParams);
  }
  if (searchParams.has(QueryParams.Order) && (!searchParams.has(QueryParams.Sort))) {
    searchParams.set(QueryParams.Sort, SortType.Price);
    setSeachParams(searchParams);
  }

  const handleClickSort = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget.name === '_sort') {
      searchParams.set(QueryParams.Sort, String(evt.currentTarget.dataset.sort));
    }
    if (evt.currentTarget.name === '_order') {
      searchParams.set(QueryParams.Order, String(evt.currentTarget.dataset.order));
    }

    setSeachParams(searchParams);
  };

  useEffect(() => {
    dispatch(fetchCamerasAction({pageId, paramsSort}));
  }, [dispatch, pageId, paramsSort]);

  useEffect(() => {
    dispatch(fetchCamerasOfMinMaxPrice());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Banner />
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">Сортировать:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input onChange={handleClickSort} type="radio" id="sortPrice" name="_sort" data-sort="price" checked={paramsSort._sort === SortType.Price}/>
                            <label htmlFor="sortPrice">по цене</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input onChange={handleClickSort} type="radio" id="sortPopular" name="_sort" data-sort="rating" checked={paramsSort._sort === SortType.Rating}/>
                            <label htmlFor="sortPopular">по популярности</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input onChange={handleClickSort} type="radio" id="up" name="_order" data-order="asc" aria-label="По возрастанию" checked={paramsSort._order === OrderType.Asc} />
                            <label htmlFor="up">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input onChange={handleClickSort} type="radio" id="down" name="_order" data-order="desc" aria-label="По убыванию" checked={paramsSort._order === OrderType.Desc}/>
                            <label htmlFor="down">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <CatalogCards />
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
