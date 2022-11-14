import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getMaxPriceOfCameras, getMinPriceOfCameras } from '../../store/cameras-data/selectors';

export default function PriceRange(): JSX.Element {
  // const minPriceRef = useRef<HTMLInputElement>(null);
  // console.log(minPriceRef.current?.value)


  const minPrice = useAppSelector(getMinPriceOfCameras);
  const maxPrice = useAppSelector(getMaxPriceOfCameras);
  const [searchParams, setSeachParams] = useSearchParams();
  const [minPriceValue, setMinPriceValue] = useState(String(searchParams.get(QueryParams.MinPrice)));
  const [maxPriceValue, setMaxPriceValue] = useState(String(searchParams.get(QueryParams.MaxPrice)));

  const handleChangeMinPriceValue = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) < 0) {
      setMinPriceValue('0');
      return;
    }
    setMinPriceValue(evt.target.value);
  };

  const changeMinPriceInput = () => {
    if (!minPriceValue) {
      searchParams.delete(QueryParams.MinPrice);
      setSeachParams(searchParams);
      return;
    }
    if (Number(minPriceValue) < minPrice) {
      setMinPriceValue(String(minPrice));
      searchParams.set(QueryParams.MinPrice, String(minPrice));
      setSeachParams(searchParams);
      return;
    }
    searchParams.set(QueryParams.MinPrice, minPriceValue);
    setSeachParams(searchParams);
  };

  const handleChangeMaxPriceValue = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) < 0) {
      setMaxPriceValue('0');
      return;
    }
    setMaxPriceValue(evt.target.value);
  };

  const changeMaxPriceInput = () => {
    if (!maxPriceValue) {
      searchParams.delete(QueryParams.MaxPrice);
      setSeachParams(searchParams);
      return;
    }
    if (Number(maxPriceValue) > maxPrice) {
      setMaxPriceValue(String(maxPrice));
      searchParams.set(QueryParams.MaxPrice, String(maxPrice));
      setSeachParams(searchParams);
      return;
    }
    if (Number(maxPriceValue) < Number(minPriceValue)) {
      setMaxPriceValue(minPriceValue);
      searchParams.set(QueryParams.MaxPrice, minPriceValue);
      setSeachParams(searchParams);
      return;
    }
    searchParams.set(QueryParams.MaxPrice, maxPriceValue);
    setSeachParams(searchParams);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input onBlur={changeMinPriceInput} onChange={handleChangeMinPriceValue} type="number" name="price" placeholder={String(minPrice)} value={minPriceValue}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input onBlur={changeMaxPriceInput} onChange={handleChangeMaxPriceValue} type="number" name="priceUp" placeholder={String(maxPrice)} value={maxPriceValue}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
}
