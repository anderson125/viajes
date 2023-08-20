import { useEffect, useState } from "react";
import axios from "axios";

import styles from './cards.module.css'
import Link from "next/link";
import Swal from "sweetalert2";

const CardsAdmin = ({ muni }) => {

    const [customers, setCustomers] = useState([]);
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        if (muni) {
            axios.get(`https://api.directorioturismo.com/api/customer/search-customer/?muni=${muni}`)
                .then((response) => {
                    setCustomers(response.data.articles);
                })
                .catch((error) => {
                    setCustomers([]);
                });
        }
    }, [muni])

    useEffect(() => {
        axios
            .get('https://api.directorioturismo.com/api/category/get-categories')
            .then((response) => {
                setCategorys(response.data.categories);
            })
            .catch((error) => {
                setCategorys([]);
            });
    }, [])

    const handleDelete = (id) => {
        const token = localStorage.getItem('nestedToken');

        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, borrarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://api.directorioturismo.com/api/customer/customer-delete/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                    .then(() => {
                        setCustomers(prevCustomers => prevCustomers.filter(item => item._id !== id));
                        Swal.fire('¡Borrado!', 'El registro ha sido eliminado.', 'success');
                    })
                    .catch(() => {
                        Swal.fire('Error', 'Ha ocurrido un error al borrar el registro.', 'error');
                    });
            }
        });
    }

    const handleDeleteCategorie = (id) => {
        const token = localStorage.getItem('nestedToken');

        Swal.fire({
            title: '¿Estás seguro? No recomendamos esta acción para las categorias',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, borrarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://api.directorioturismo.com/api/category/delete-category/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                    .then(() => {
                        setCustomers(prevCustomers => prevCustomers.filter(item => item._id !== id));
                        Swal.fire('¡Borrado!', 'El registro ha sido eliminado.', 'success');
                    })
                    .catch(() => {
                        Swal.fire('Error', 'Ha ocurrido un error al borrar el registro.', 'error');
                    });
            }
        });
    }
    
    return (
        <>
            <main className={styles['main-admin']}>
                {customers.length > 0 ?
                    customers.map(item => (
                        <div className={styles['container-customer']} key={item._id}>
                            {console.log(item)}
                            <h4>{item.company_name}</h4>

                            <div className={styles['buttons-customer']}>
                                <Link href={`/customers/edit/${item._id}`}>Editar</Link>
                                <button onClick={() => handleDelete(item._id)}>Borrar</button>
                            </div>
                        </div>
                    ))
                    : (
                        <div className={styles['text-admin']}>
                            <h2>Busquemos los clientes</h2>
                        </div>
                    )}
            </main>

            <div className={styles['categories-div']}>
                <h3>Categorias</h3>
            </div>

            <section className={styles['main-admin']}>
                {categorys.map(item => (
                    <div className={styles['container-customer']} key={item._id}>
                        <h4>{item.categorie}</h4>

                        <div className={styles['buttons-customer']}>
                            <Link href={`/categories/edit/${item._id}`}>Editar</Link>
                            <button onClick={() => handleDeleteCategorie(item._id)}>Borrar</button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default CardsAdmin