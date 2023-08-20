import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

import styles from './categorie.module.css';
import axios from 'axios';
import { Layout } from '@/components/layouts/Layout';
import { Header } from '@/components/header/Header';
import Swal from 'sweetalert2';

const CategoriesCreate = () => {

    const router = useRouter();

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

    const [categorie, setCategorie] = useState('');

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
            const response = await axios.post('https://api.directorioturismo.com/api/category/save', CategorieName, { headers: { Authorization: `${token}` } });
            Swal.fire({
                icon: 'success',
                title: 'La Categoria Fue Creada Correctamente',
            });
            router.push('/admin/panel');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title="Crear Categorias">
            <Header />
            <div className={styles["container-categories"]}>

                <div className={styles['form-container']}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h1>Crear Categoria</h1>
                        </div>

                        <div className={styles.control}>
                            <input type="categorie" id="categorie" value={categorie} onChange={handleCategorieChange}
                                placeholder='Nombre Categoria'
                            />
                        </div>
                        <div className={styles['control-button']}>
                            <button type="submit" >Crear Categoria</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CategoriesCreate;
