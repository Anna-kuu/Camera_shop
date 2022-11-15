import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchCamerasByNameAction } from '../../store/api-actions';
import { getCamerasByName } from '../../store/cameras-data/selectors';

export default function FormSearch(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const camerasByName = useAppSelector(getCamerasByName);

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleEnterKeyDown = (evt: KeyboardEvent<HTMLLIElement>, id: number) => {
    if (evt.key === 'Enter') {
      redirectToCamera(id);
    }
  };

  const redirectToCamera = (id: number) => {
    navigate(`${APIRoute.Cameras}/${id}`);
    setName('');
  };

  useEffect(()=> {
    if (name) {
      dispatch(fetchCamerasByNameAction(name));}
  }, [dispatch, name]);

  return (
    <div data-testid="form-search" className={`form-search ${camerasByName?.length > 0 && name ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input onChange={handleSearchChange} value={name} className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту" />
        </label>
        <ul className="form-search__select-list">
          {camerasByName.map((camera) =>
            (<li onKeyDown={(evt) => handleEnterKeyDown(evt, camera.id)} onClick={() => redirectToCamera(camera.id)} key={`search-camera-${camera.id}`} className="form-search__select-item" tabIndex={0}>{camera.name}</li>))}
        </ul>
      </form>
      <button onClick={() => setName('')} className="form-search__reset" type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
