import React, { useState } from 'react';
import styles from './ResultsGrid.module.css';
import Slider from '../slider/Slider';

const ResultsGrid = ({ customers }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setShowInfo(true);
  };
  
  const handleButtonSelect = (buttonId) => {
    setSelectedButtonId(buttonId);
  };
  
  const images = selectedCustomer ? [
    selectedCustomer.file_01,
    selectedCustomer.file_02,
    selectedCustomer.file_03,
    selectedCustomer.file_04,
    selectedCustomer.file_05,
    selectedCustomer.file_06,
    selectedCustomer.file_07,
    selectedCustomer.file_08,
    selectedCustomer.file_09,
    selectedCustomer.file_10,
  ] : [];

  return (
    <section className={styles['container-searchs']}>
      <div className={styles['cointainer-grid']}>
        <div className={styles['cointainer-clientes']}>
          <div>
            <h1>Resultados</h1>
          </div>
          {customers.length > 0 ? (
            customers.map((item) => (
              <div
                className={`${styles['control-button']} ${selectedButtonId === item._id ? styles['selected'] : ''}`}
                key={item._id}
                onClick={() => {
                  handleCustomerSelect(item);
                  handleButtonSelect(item._id);
                }}
              >
                <div>
                  <button className={styles['button-client']}>
                    {item.company_name}
                  </button>
                </div>
                <div>
                  <span className="material-symbols-outlined">groups</span>
                </div>
              </div>
            ))
          ) : (
            <h4>No se encontraron clientes en esta categoría</h4>
          )}
        </div>

        {showInfo && (
          <div className={styles['cointainer-info']}>
            {selectedCustomer && (
              <h1>{selectedCustomer.company_name}</h1>
            )}
          
            <div>
              <Slider images={images} />
            </div>
            {selectedCustomer && (
              <div>
                <p>{selectedCustomer.description}</p>
                <p><span>Página Web:</span> {selectedCustomer.link}</p>
                <p><span>Teléfonos:</span> {selectedCustomer.phone_number}</p>
                <p><span>e-mail: </span>{selectedCustomer.email}</p>
                <p>{selectedCustomer.address}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsGrid;