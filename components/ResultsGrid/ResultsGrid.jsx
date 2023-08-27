import React, { useEffect, useState } from 'react';
import styles from './ResultsGrid.module.css';
import Slider from '../slider/Slider';

import LogoWs from '../../assets/wpp/logo_wsss.svg'
import Logowww from '../../assets/wpp/Logo_www.svg'
import Link from 'next/link';
import Image from 'next/image';

const ResultsGrid = ({ customers }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showInfo, setShowInfo] = useState(false);
    const [selectedButtonId, setSelectedButtonId] = useState(null);

    useEffect(() => {
        customers?.map((item, index) => {
            if (index == 0) {
                setSelectedCustomer(item)
                setShowInfo(true)
                setSelectedButtonId(item._id)
            }
        })
    }, [customers])

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
                        <h2>Resultados</h2>
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
                            <h2>{selectedCustomer.company_name}</h2>
                        )}

                        <div>
                            <Slider images={images} />
                        </div>
                        {selectedCustomer && (
                            <div>
                                <p>{selectedCustomer.description}</p>
                                <p><span>Página Web:</span> {selectedCustomer.link}</p>
                                <p><span>Teléfonos:</span> {selectedCustomer.phone_number}</p>
                                <div className={styles['buttons-contact']}>
                                    <div className={styles['text-buttons']}>
                                        <p><span>e-mail: </span>{selectedCustomer.email}</p>
                                        <p>{selectedCustomer.address}</p>
                                    </div>

                                    <div className={styles['button-responsive']}>
                                        <Link href={`http://${selectedCustomer.link}`} target='_blank' rel="noopener noreferrer">
                                            <Image src={Logowww} alt="www" className={styles['www-logo']} />
                                        </Link>

                                        <Link href={`https://api.whatsapp.com/send?phone=${selectedCustomer.phone_number}`} target='_blank'>
                                            <Image src={LogoWs} alt="wpp" className={styles['wpp-logo']} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ResultsGrid;