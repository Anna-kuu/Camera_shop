import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import ModalAddItemSuccess from '../../components/modal-add-item-success/modal-add-item-success';
import ModalAddItem from '../../components/modal-add-item/modal-add-item';
import CatalogCards from '../../components/catalog-cards/catalog-cards';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import ErrorScreen from '../../components/error-screen/error-screen';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NotFoundScreen from '../../components/not-found-screen/not-found-screen';
import Pagination from '../../components/pagination/pagination';
import Preloader from '../../components/preloader/preloader';
import { OrderType, SortType, QueryParams, MAX_CAMERAS_OF_PAGE, DataLoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchCamerasAction, fetchCamerasMinMaxPrice, fetchCamerasMinMaxPriceFiltered } from '../../store/api-actions';
import { getCameras, getCamerasCount, getLoadingDataStatus } from '../../store/cameras-data/selectors';
import { Camera } from '../../types/cameras-type';

export default function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const pageId = Number(params.pageId);
  const [searchParams, setSeachParams] = useSearchParams();
  const camerasCount = useAppSelector(getCamerasCount);
  const pagesCount = Math.ceil(camerasCount / MAX_CAMERAS_OF_PAGE);
  const loadingCamerasStatus = useAppSelector(getLoadingDataStatus);
  const cameras = useAppSelector(getCameras);
  const [selectedCamera, setSelectedCamera] = useState({} as Camera);
  const [isModalAddItemActiv, setIsModalAddItemActive] = useState(false);
  const [isModalAddItemSuccess, setIsModalAddItemSuccess] = useState(false);

  const paramsSort = useMemo(() => ({
    _sort: searchParams.get(QueryParams.Sort),
    _order: searchParams.get(QueryParams.Order),
    category: searchParams.getAll(QueryParams.Category),
    type: searchParams.getAll(QueryParams.Type),
    level: searchParams.getAll(QueryParams.Level),
    minPrice: searchParams.get(QueryParams.MinPrice),
    maxPrice: searchParams.get(QueryParams.MaxPrice),
  }), [searchParams]);

  if (searchParams.has(QueryParams.Sort) && (!searchParams.has(QueryParams.Order))) {
    searchParams.set(QueryParams.Order, OrderType.Asc);
    setSeachParams(searchParams);
  }
  if (searchParams.has(QueryParams.Order) && (!searchParams.has(QueryParams.Sort))) {
    searchParams.set(QueryParams.Sort, SortType.Price);
    setSeachParams(searchParams);
  }

  const handleSortChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === '_sort') {
      searchParams.set(QueryParams.Sort, String(evt.target.dataset.sort));
    }
    if (evt.target.name === '_order') {
      searchParams.set(QueryParams.Order, String(evt.target.dataset.order));
    }

    setSeachParams(searchParams);
  };

  useEffect(() => {
    dispatch(fetchCamerasAction({pageId, paramsSort}));
  }, [dispatch, pageId, paramsSort]);

  useEffect(() => {
    dispatch(fetchCamerasMinMaxPrice());
  },[dispatch]);

  useEffect(() => {
    dispatch(fetchCamerasMinMaxPriceFiltered({
      params: {
        category: paramsSort.category,
        type: paramsSort.type,
        level: paramsSort.level,
        minPrice: paramsSort.minPrice,
        maxPrice: paramsSort.maxPrice,
      }
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, paramsSort.category.join(','), paramsSort.level.join(','), paramsSort.type.join(','), paramsSort.minPrice, paramsSort.maxPrice]);

  if ((pageId > pagesCount || pageId <= 0) && pagesCount !== 0) {
    return <NotFoundScreen />;
  }

  if (loadingCamerasStatus === DataLoadingStatus.Rejected) {
    return <ErrorScreen />;
  }

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
                  <a className="breadcrumbs__link" href="index.html">??????????????
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">??????????????</span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">?????????????? ????????- ?? ????????????????????????</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <div className="catalog-sort">
                    <form action="#">
                      <div className="catalog-sort__inner">
                        <p className="title title--h5">??????????????????????:</p>
                        <div className="catalog-sort__type">
                          <div className="catalog-sort__btn-text">
                            <input onChange={handleSortChange} type="radio" id="sortPrice" name="_sort" data-sort="price" checked={paramsSort._sort === SortType.Price}/>
                            <label htmlFor="sortPrice">???? ????????</label>
                          </div>
                          <div className="catalog-sort__btn-text">
                            <input onChange={handleSortChange} type="radio" id="sortPopular" name="_sort" data-sort="rating" checked={paramsSort._sort === SortType.Rating}/>
                            <label htmlFor="sortPopular">???? ????????????????????????</label>
                          </div>
                        </div>
                        <div className="catalog-sort__order">
                          <div className="catalog-sort__btn catalog-sort__btn--up">
                            <input onChange={handleSortChange} type="radio" id="up" name="_order" data-order="asc" aria-label="???? ??????????????????????" checked={paramsSort._order === OrderType.Asc} />
                            <label htmlFor="up">
                              <svg width="16" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-sort"></use>
                              </svg>
                            </label>
                          </div>
                          <div className="catalog-sort__btn catalog-sort__btn--down">
                            <input onChange={handleSortChange} type="radio" id="down" name="_order" data-order="desc" aria-label="???? ????????????????" checked={paramsSort._order === OrderType.Desc}/>
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
                  {loadingCamerasStatus === DataLoadingStatus.Pending ? <Preloader /> : ''}
                  {!cameras.length && loadingCamerasStatus === DataLoadingStatus.Fulfilled ? <h2 className="title title--h2">???? ???????????? ?????????????? ???????????? ???? ??????????????</h2> : ''}
                  {cameras.length && loadingCamerasStatus === DataLoadingStatus.Fulfilled ?
                    <>
                      <CatalogCards cameras={cameras} setSelectedCamera={setSelectedCamera} setIsModalAddItemActive={setIsModalAddItemActive}/>
                      <Pagination pagesCount={pagesCount}/>
                    </> : ''}
                </div>
              </div>
            </div>
          </section>
        </div>
        {isModalAddItemActiv &&
        <ModalAddItem selectedCamera={selectedCamera} setIsModalAddItemActive={setIsModalAddItemActive} setIsModalAddItemSuccess={setIsModalAddItemSuccess}/>}
        {isModalAddItemSuccess &&
        <ModalAddItemSuccess setIsModalAddItemSuccess={setIsModalAddItemSuccess}/>}
      </main>
      <Footer />
    </div>
  );
}
