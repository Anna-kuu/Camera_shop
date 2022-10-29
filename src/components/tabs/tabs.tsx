import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CameraTabs } from '../../const';
import { Camera } from '../../types/cameras-type';

type TabsProps = {
  camera: Camera;
}

export default function Tabs({camera}: TabsProps):JSX.Element {
  const [activeTab, setActiveTab] = useState(CameraTabs.Specification);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <Link to={`?tab=${CameraTabs.Specification}`} onClick={() => setActiveTab(CameraTabs.Specification)} className={`tabs__control ${activeTab === CameraTabs.Specification ? 'is-active' : ''}`} type="button">Характеристики</Link>
        <Link to={`?tab=${CameraTabs.Description}`} onClick={() => setActiveTab(CameraTabs.Description)} className={`tabs__control ${activeTab === CameraTabs.Description ? 'is-active' : ''}`} type="button">Описание</Link>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${activeTab === CameraTabs.Specification ? 'is-active' : ''}`}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {camera.vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{camera.category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{camera.type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{camera.level}</p>
            </li>
          </ul>
        </div>
        <div className={`tabs__element ${activeTab === CameraTabs.Description ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            <p>{camera.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
