import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getMaxPriceOfCameras, getMaxPriceOfCamerasFiltered, getMinPriceOfCameras, getMinPriceOfCamerasFiltered } from '../../store/cameras-data/selectors';

export default function PriceRange(): JSX.Element {

  const minPrice = useAppSelector(getMinPriceOfCameras);
  const maxPrice = useAppSelector(getMaxPriceOfCameras);
  let minPriceFiltered = useAppSelector(getMinPriceOfCamerasFiltered);
  let maxPriceFiltered = useAppSelector(getMaxPriceOfCamerasFiltered);
  const [searchParams, setSeachParams] = useSearchParams();
  const [minPriceValue, setMinPriceValue] = useState(Number(searchParams.get(QueryParams.MinPrice) || '0'));
  const [maxPriceValue, setMaxPriceValue] = useState(Number(searchParams.get(QueryParams.MaxPrice) || '0'));

  useEffect(() => {
    if (minPriceFiltered && minPriceValue ) {
      setMinPriceValue(Math.max(minPriceValue, minPriceFiltered));
    }
    if (maxPriceFiltered && maxPriceValue) {
      setMaxPriceValue(Math.min(maxPriceValue, maxPriceFiltered));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPriceFiltered, maxPriceFiltered]);

  const handleMinPriceValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) < 0) {
      setMinPriceValue(0);
      return;
    }
    setMinPriceValue(Number(evt.target.value));
  };

  const changeMinPriceInput = () => {
    if (!minPriceValue) {
      searchParams.delete(QueryParams.MinPrice);
    } else {
      minPriceFiltered = minPrice;
      let newValue = Math.max(minPriceValue, minPriceFiltered);
      newValue = Math.min(newValue, maxPriceValue || maxPriceFiltered);
      setMinPriceValue(newValue);
      searchParams.set(QueryParams.MinPrice, String(newValue));
    }
    setSeachParams(searchParams);
  };

  const handleMaxPriceValueChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.target.value) < 0) {
      setMaxPriceValue(0);
      return;
    }
    setMaxPriceValue(Number(evt.target.value));
  };

  const changeMaxPriceInput = () => {
    if (!maxPriceValue) {
      searchParams.delete(QueryParams.MaxPrice);
    } else {
      maxPriceFiltered = maxPrice;
      let newValue = Math.min(maxPriceValue, maxPriceFiltered);
      newValue = Math.max(newValue, minPriceValue || minPriceFiltered);
      setMaxPriceValue(newValue);
      searchParams.set(QueryParams.MaxPrice, String(newValue));
    }
    setSeachParams(searchParams);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input data-testid="price" onBlur={changeMinPriceInput} onChange={handleMinPriceValueChange} type="number" name="price" placeholder={String(minPriceFiltered)} value={minPriceValue ? minPriceValue : ''}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input data-testid="priceUp" onBlur={changeMaxPriceInput} onChange={handleMaxPriceValueChange} type="number" name="priceUp" placeholder={String(maxPriceFiltered)} value={maxPriceValue ? maxPriceValue : ''}/>
          </label>
        </div>
      </div>
    </fieldset>
  );
}
