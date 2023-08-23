import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

import Form from '@/components/forms/Form';
import { Layout } from '@/components/layouts/Layout';
import { Header } from '@/components/header/Header';
import Swal from 'sweetalert2';

const ClientEdit = () => {
    const router = useRouter();
    const { id } = router.query;

    const [customer, setCustomer] = useState({})
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
        how_to_get: '',
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
                axios.get(`https://api.directorioturismo.com/api/customer/customer/${id}`, {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                    .then((response) => {
                        setCustomer(response.data.customer)
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            company_name: response.data.customer.company_name || '',
                            identification: response.data.customer.identification || '',
                            name: response.data.customer.name || '',
                            surname: response.data.customer.surname || '',
                            phone_number: response.data.customer.phone_number || '',
                            municipality_id: response.data.customer.municipality_id || '',
                            category_id: response.data.customer.category_id || '',
                            Email: response.data.customer.Email || '',
                            address: response.data.customer.address || '',
                            how_to_get: response.data.customer.how_to_get || '',
                            description: response.data.customer.description || '',
                            RNT: true,
                            link: response.data.customer.link || '',
                            file_rnt: response.data.customer.file_rnt || null,
                            file_01: response.data.customer.file_01 || null,
                            file_02: response.data.customer.file_02 || null,
                            file_03: response.data.customer.file_03 || null,
                            file_04: response.data.customer.file_04 || null,
                            file_05: response.data.customer.file_05 || null,
                            file_06: response.data.customer.file_06 || null,
                            file_07: response.data.customer.file_07 || null,
                            file_08: response.data.customer.file_08 || null,
                            file_09: response.data.customer.file_09 || null,
                            file_10: response.data.customer.file_10 || null,
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

            const response = await axios.put(`https://api.directorioturismo.com/api/customer/update-customer/${id}`, formDataToSend, {
                headers: {
                    Authorization: `${token}`
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'El Cliente Fue Editado Correctamente',
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
        <Layout title={`Editando - ${customer.company_name}`}>
            <Header />
            <Form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} customer={customer}/>
        </Layout>
    );
};

export default ClientEdit;