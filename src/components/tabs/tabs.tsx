import { useState } from 'react';
import { Camera } from '../../types/cameras-type';

type TabsProps = {
  camera: Camera;
}

export default function Tabs({camera}: TabsProps):JSX.Element {
  const [activeTab, setActiveTab] = useState('Характеристики');
  const handleTabClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (evt.currentTarget.textContent !== null) {
      setActiveTab(evt.currentTarget.textContent);
    }
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button onClick={handleTabClick} className={`tabs__control ${activeTab === 'Характеристики' ? 'is-active' : ''}`} type="button">Характеристики</button>
        <button onClick={handleTabClick} className={`tabs__control ${activeTab === 'Описание' ? 'is-active' : ''}`} type="button">Описание</button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${activeTab === 'Характеристики' ? 'is-active' : ''}`}>
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
        <div className={`tabs__element ${activeTab === 'Описание' ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            <p>{camera.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
