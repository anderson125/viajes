import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from './SearchBar.module.css';
import Swal from 'sweetalert2';

export const SearchBar = () => {
    const [municipioValue, setMunicipioValue] = useState('');
    const [municipioID, setMunicipioID] = useState(null);
    const [municipios, setMunicipios] = useState([]);
    const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);
    const municipioListaRef = useRef(null);
    const router = useRouter();

    const handleMunicipioChange = (e) => {
        const value = e.target.value;
        setMunicipioValue(value);

        const filtrados = municipios.filter((mun) =>
            mun.municipality_name.toLowerCase().includes(value.toLowerCase())
        );

        setMunicipiosFiltrados(filtrados);
    };

    const handleMunicipioSelect = (mun) => {
        setMunicipioValue(mun.municipality_name);
        setMunicipioID(mun._id);
        setMunicipiosFiltrados([]);
    };


    useEffect(() => {
        const resultado = municipios.find(
            (item) => item.municipality_name === municipioValue.toLocaleUpperCase()
        );
        if (resultado && resultado._id) {
            setMunicipioID(resultado._id);
        } else {
            setMunicipioID(null)
        }
    }, [municipioValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                municipioListaRef.current &&
                !municipioListaRef.current.contains(event.target)
            ) {
                setMunicipiosFiltrados([]);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        axios.get(`https://api.directorioturismo.com/api/depa-muni/get-muni`)
            .then((response) => {
                setMunicipios(response.data.municipality);
            })
            .catch((error) => {
                setMunicipios([]);
                Swal.fire({
                    icon: 'error',
                    title: 'Disculpa, tenemos un error en el sistema',
                });
            });
    }, [])

    useEffect(() => {
        const resultado = municipios.find(
            (item) => item._id === municipioID
        );
        if (resultado && resultado._id) {
            setMunicipioID(resultado._id);
        } else {
            setMunicipioID(null)
        }
    }, [municipioID]);

    useEffect(() => {
        setMunicipioValue('');
        setMunicipios([]);
    }, []);

    const handleButtonClick = () => {
        if (municipioID) {
            router.push(`/searches/${municipioID}`);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Por favor, selecciona correctamente la cuidad',
            });
        }
    };

    return (
        <section className={styles['container-busqueda']}>
            <div className={styles["container-flex"]}>

                <div className={styles['container-icon-busqLugar']}>
                    <span className={`material-symbols-outlined icon__lugar ${styles["button-design-list"]}`}>location_on</span>
                    <input
                        className={styles['input-lugar']}
                        type="text"
                        name="ciudad"
                        placeholder="Ciudad"
                        value={municipioValue}
                        onChange={handleMunicipioChange}
                    />
                    {municipiosFiltrados.length > 0 && (
                        <ul ref={municipioListaRef} className={styles['departamentos-list']}>
                            {municipiosFiltrados.map((mun) => (
                                <li key={mun._id} onClick={() => handleMunicipioSelect(mun)} className={styles['list-departament']}>
                                    <div>
                                        <span className={`material-symbols-outlined icon__lugar ${styles["button-design-list"]}`}>location_on</span>
                                    </div>

                                    <div className={styles['text-list']}>
                                        {/* Cambia cómo se muestra el nombre del municipio */}
                                        {mun.municipality_name === "Santa Fe de BogotA" ? "Bogotá" : mun.municipality_name} - {mun.department_id.department}
                                        <div className={styles['text-span-container']}>
                                            <span className={styles['span-text']}>
                                                Ciudad
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className={styles["container-boton-buscar"]}>
                    <button className={styles["boton-buscar"]} onClick={handleButtonClick}>
                        <span className="material-symbols-outlined icon__lupa">search</span>
                        <p>buscar</p>
                    </button>
                </div>
            </div>

        </section>
    )
}
