import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParams, CategoryType, TypeFilter, LevelType } from '../../const';
import PriceRange from '../price-range/price-range';

export default function CatalogFilter(): JSX.Element {
  const [searchParams, setSeachParams] = useSearchParams();

  const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const filter = evt.target.name;
    const filterName = evt.target.id;
    const currentValues = searchParams.getAll(filter);
    if (currentValues.includes(filterName)) {
      searchParams.delete(filter);
      currentValues.filter((value) => value !== filterName).forEach((value) => {
        searchParams.append(filter, String(value));
      });
    } else {
      searchParams.append(filter, String(filterName));
    }

    setSeachParams(searchParams);
  };

  const handleResetButton = () => {
    const newParams = Array.from(searchParams.entries()).filter(([key, value]) => (key === QueryParams.Sort || key === QueryParams.Order));
    setSeachParams(newParams);
  };

  return (
    <div className="catalog-filter" data-testid="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <PriceRange />
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleFilterChange} type="checkbox" name={QueryParams.Category} id={CategoryType.photocamera} checked={searchParams.getAll(QueryParams.Category).includes(CategoryType.photocamera)} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleFilterChange} type="checkbox" name={QueryParams.Category} id={CategoryType.videocamera} checked={searchParams.getAll(QueryParams.Category).includes(CategoryType.videocamera)}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleFilterChange} type="checkbox" name={QueryParams.Type} id={TypeFilter.digital} checked={searchParams.getAll(QueryParams.Type).includes(TypeFilter.digital)} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name={QueryParams.Type}
                id={TypeFilter.film}
                checked={searchParams.getAll(QueryParams.Type).includes(TypeFilter.film)}
                disabled={searchParams.getAll(QueryParams.Category).includes(CategoryType.videocamera) && !searchParams.getAll(QueryParams.Category).includes(CategoryType.photocamera)}
              />
              <span className="custom-checkbox__icon">
              </span><span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                onChange={handleFilterChange}
                type="checkbox"
                name={QueryParams.Type}
                id={TypeFilter.snapshot}
                checked={searchParams.getAll(QueryParams.Type).includes(TypeFilter.snapshot)}
                disabled={searchParams.getAll(QueryParams.Category).includes(CategoryType.videocamera) && !searchParams.getAll(QueryParams.Category).includes(CategoryType.photocamera)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleFilterChange} type="checkbox" name={QueryParams.Type} id={TypeFilter.collection} checked={searchParams.getAll(QueryParams.Type).includes(TypeFilter.collection)} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleFilterChange} type="checkbox" name={QueryParams.Level} id={LevelType.zero} checked={searchParams.getAll(QueryParams.Level).includes(LevelType.zero)} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleFilterChange} type="checkbox" name={QueryParams.Level} id={LevelType.nonProfessional} checked={searchParams.getAll(QueryParams.Level).includes(LevelType.nonProfessional)} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleFilterChange} type="checkbox" name={QueryParams.Level} id={LevelType.professional} checked={searchParams.getAll(QueryParams.Level).includes(LevelType.professional)} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button onClick={handleResetButton} className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
