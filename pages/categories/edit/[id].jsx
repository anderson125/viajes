import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

import styles from './categorie.module.css';
import axios from 'axios';
import { Layout } from '@/components/layouts/Layout';
import { Header } from '@/components/header/Header';
import Swal from 'sweetalert2';

const CategoriesEdit = () => {

    const router = useRouter();
    const { id } = router.query;
    const [categorie, setCategorie] = useState({
        categorie: '',
    });

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('nestedToken');

        if (!isLoggedIn) {
            router.push('/authentication/login');
            return;
        }

        const jwtSecret = process.env.JWT_SECRET;

        try {
            const decodedToken = jwt.decode(isLoggedIn);

            if (!decodedToken) {
                localStorage.removeItem('nestedToken');
                router.push('/authentication/login');
                return;
            }
            if (decodedToken.signature !== jwtSecret) {
                localStorage.removeItem('nestedToken');
                router.push('/authentication/login');
            }
        } catch (error) {
            localStorage.removeItem('nestedToken');
            router.push('/authentication/login');
        }
    }, []);

    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('nestedToken');

            try {
                axios.get(`https://api.directorioturismo.com/api/category/get-category/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                    .then((response) => {
                        setCategorie((prevFormData) => ({
                            ...prevFormData,
                            categorie: response.data.category.categorie
                        }));
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error?.response?.data?.message,
                        });
                    });

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error?.response?.data?.message,
                });
            }
        }
    }, [id]);

    const handleCategorieChange = (e) => {
        setCategorie(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('nestedToken')

        const CategorieName = {
            categorie
        };

        try {
            const response = await axios.put(`https://api.directorioturismo.com/api/category/edit-category/${id}`, CategorieName, { headers: { Authorization: `${token}` } });
            Swal.fire({
                icon: 'success',
                title: 'La Categoria Fue Modificada Correctamente',
            });
            router.push('/admin/panel');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.response?.data?.message,
            });
        }
    };

    return (
        <Layout title={`Editar - ${categorie.categorie}`}>
            <Header />
            <div className={styles["container-categories"]}>

                <div className={styles['form-container']}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h1>{categorie.categorie}</h1>
                        </div>

                        <div className={styles.control}>
                            <input type="categorie" id="categorie" value={categorie.categorie} onChange={handleCategorieChange}
                                placeholder='Nombre Categoria'
                            />
                        </div>
                        <div className={styles['control-button']}>
                            <button type="submit" >Editar Categoria</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CategoriesEdit;