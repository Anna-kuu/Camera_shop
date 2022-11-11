import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getMaxPriceOfCameras, getMinPriceOfCameras } from '../../store/cameras-data/selectors';

export default function CatalogFilter(): JSX.Element {
  const minPrice = useAppSelector(getMinPriceOfCameras);
  const maxPrice = useAppSelector(getMaxPriceOfCameras);
  const [searchParams, setSeachParams] = useSearchParams();

  const handleChangeFilter = (evt: ChangeEvent<HTMLInputElement>) => {
    const filter = evt.target.name;
    const filterName = evt.target.id;
    const currentValues = searchParams.getAll(filter);
    if (currentValues.includes(filterName)) {
      searchParams.delete(filter);
      currentValues.filter((v) => v !== filterName).forEach((v) => {
        searchParams.append(filter, String(v));
      });
    } else {
      searchParams.append(filter, String(filterName));
    }
    /*if (searchParams.getAll(evt.target.name).includes(evt.target.id)) {
      console.log(true)
    }
    //console.log(searchParams.get('category') !== 'Фотокамера');
    //console.log(searchParams.getAll(evt.target.name))
    //console.log(searchParams.getAll(evt.target.name).includes(evt.target.id))
    console.log(evt.target.id)
    console.log(evt.target.name)

    searchParams.append(evt.target.name, String(evt.target.id));*/
    //console.log(searchParams.get('category') !== 'Видеокамера');
    /*if (evt.currentTarget.name === QueryParams.Category && searchParams.get(evt.currentTarget.dataset.category) !== evt.currentTarget.dataset.category) {
      searchParams.append(QueryParams.Category, String(evt.currentTarget.dataset.category));
    }
    if (evt.currentTarget.name === QueryParams.Type) {
      searchParams.append(QueryParams.Type, String(evt.currentTarget.dataset.type));
    }
    if (evt.currentTarget.name === QueryParams.Level) {
      searchParams.append(QueryParams.Level, String(evt.currentTarget.dataset.level));
    }*/
    //searchParams.set('category', 'Фотокамера');
    setSeachParams(searchParams);
  };

  const handleResetButton = () => {
    const newParams = Array.from(searchParams.entries()).filter(([key, value]) => (key === '_sort' || key === '_order'));
    setSeachParams(newParams);
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" value={minPrice}/>
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до" value={maxPrice}/>
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleChangeFilter} type="checkbox" name="category" id="Фотоаппарат" checked={searchParams.getAll('category').includes('Фотоаппарат')} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Фотоаппарат</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleChangeFilter} type="checkbox" name="category" id="Видеокамера" checked={searchParams.getAll('category').includes('Видеокамера')}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleChangeFilter} type="checkbox" name="type" id="Цифровая" checked={searchParams.getAll('type').includes('Цифровая')} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleChangeFilter} type="checkbox" name="type" id="Плёночная" checked={searchParams.getAll('type').includes('Плёночная')} disabled={searchParams.getAll('category').includes('Видеокамера')}/>
              <span className="custom-checkbox__icon">
              </span><span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleChangeFilter} type="checkbox" name="type" id="Моментальная" checked={searchParams.getAll('type').includes('Моментальная')} disabled={searchParams.getAll('category').includes('Видеокамера')}/>
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleChangeFilter} type="checkbox" name="type" id="Коллекционная" checked={searchParams.getAll('type').includes('Коллекционная')} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleChangeFilter} type="checkbox" name="level" id="Нулевой" checked={searchParams.getAll('level').includes('Нулевой')} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleChangeFilter} type="checkbox" name="level" id="Любительский" checked={searchParams.getAll('level').includes('Любительский')} />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input onChange={handleChangeFilter} type="checkbox" name="level" id="Профессиональный" checked={searchParams.getAll('level').includes('Профессиональный')} />
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
