import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { useRouter } from 'next/router';
import { useEffect } from "react";

import Form from '@/components/forms/Form';
import { Layout } from '@/components/layouts/Layout';
import { Header } from '@/components/header/Header';
import Swal from 'sweetalert2';
// import styles from './ClientRegistration.module.css'; // Archivo CSS para estilos adicionales

const ClientRegistration = () => {
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

    const [formData, setFormData] = useState({
        company_name: '',
        identification: '',
        name: '',
        surname: '',
        phone_number: '',
        municipality_id: '',
        category_id: '',
        Email: '',
        address: '',
        how_to_get: null,
        description: '',
        RNT: true,
        link: '',
        file_rnt: null,
        file_01: null,
        file_02: null,
        file_03: null,
        file_04: null,
        file_05: null,
        file_06: null,
        file_07: null,
        file_08: null,
        file_09: null,
        file_10: null,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: e.target.files[0],
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('nestedToken')

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        try {
            const response = await axios.post('https://api.directorioturismo.com/api/customer/save-customer', formDataToSend, {
                headers: {
                    Authorization: `${token}`
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Creacion Exitosa',
                text: '¡Bienvenido!',
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
        <Layout title="Crear Cliente">
            <Header />
            <Form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />

        </Layout>
    );
};

export default ClientRegistration;