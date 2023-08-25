import { useEffect, useState } from 'react';

import axios from 'axios'
import styles from './curtomerRegister.module.css'
import Swal from 'sweetalert2';

const Form = ({ handleSubmit, handleChange, formData, customer }) => {
    const [data, setData] = useState([]);
    const [muni, setMuni] = useState([]);


    useEffect(() => {
        axios.get('https://api.directorioturismo.com/api/category/get-categories')
            .then((response) => {
                setData(response.data.categories);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el sistema',
                    text: error?.response?.data?.message,
                });
            });
    }, []);

    useEffect(() => {
        axios.get('https://api.directorioturismo.com/api/depa-muni/get-muni')
            .then((response) => {
                setMuni(response.data.municipality);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el sistema',
                    text: error?.response?.data?.message,
                });
            });
    }, []);

    return (
        <div className={styles["container-form"]}>
            <div className={styles['container-info']}>
                <h1>{customer ? customer.company_name : 'Registro de Cliente'}</h1>
                <form onSubmit={handleSubmit} className={styles["container-grid"]}>
                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            className="form-control"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            placeholder="Nombre de la empresa"
                            required
                        />
                        <span className="material-symbols-outlined">
                            work
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            className="form-control"
                            name="identification"
                            value={formData.identification}
                            onChange={handleChange}
                            placeholder="NIT - Cedula"
                            required
                        />
                        <span className="material-symbols-outlined">
                            remember_me
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            className="form-control"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            required
                        />
                        <span className="material-symbols-outlined">
                            phone_iphone
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <span className="material-symbols-outlined">
                            mail
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre"
                            required
                        />
                        <span className="material-symbols-outlined">
                            person
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            className="form-control"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            placeholder="Apellido"
                            required
                        />
                        <span className="material-symbols-outlined">
                            person
                        </span>
                    </div>

                    <div className={styles["custom-select"]}>
                        <select onChange={handleChange} name="municipality_id" value={formData.municipality_id || ""}>
                            <option value="">Selecciona un municipio</option>
                            {muni.map((item) => (
                                <option key={item._id} value={item._id}>{item.municipality_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles["custom-select"]}>
                        <select onChange={handleChange} name="category_id" value={formData.category_id || ""}>
                            <option value="">Selecciona una categoria</option>
                            {data.map((item) => (
                                <option key={item._id} value={item._id}>{item.categorie}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Dirección"
                            required
                        />

                        <span className="material-symbols-outlined">
                            location_on
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Descripcion"
                            required
                        />
                        <span className="material-symbols-outlined">
                            edit_note
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="text"
                            className="form-control"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="Pagina Web"
                            required
                        />
                        <span className="material-symbols-outlined">
                            language
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_rnt"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            picture_as_pdf
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className={styles["file-input"]}
                            name="file_01"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_02"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_03"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_04"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_05"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_06"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_07"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"
                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_08"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_09"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["form-group"]}>
                        <input
                            type="file"
                            className="form-control-file"
                            name="file_10"
                            onChange={handleChange}
                            accept=".pdf,.png,.jpg,.jpeg"

                        />
                        <span className="material-symbols-outlined">
                            image
                        </span>
                    </div>

                    <div className={styles["control-button"]}>
                        <button type="submit">{customer ? 'Guardar Cambios' : 'Registrar cliente'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form