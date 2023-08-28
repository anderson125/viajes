import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../../../styles/login.module.css';
import { Layout } from '@/components/layouts/Layout';
import { Header } from '@/components/header/Header';
import Swal from 'sweetalert2';

const TOKEN_KEY = 'nestedToken';

const Login = () => {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem(TOKEN_KEY);

        if (isLoggedIn) {
            const tokenData = JSON.parse(isLoggedIn);
            if (tokenData.expiration > Date.now()) {
                router.push('/admin/panel');
            } else {
                localStorage.removeItem(TOKEN_KEY);
            }
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        try {
            const response = await axios.post('https://api.directorioturismo.com/api/user/login', userData);

            const { token } = response.data;

            const expiration = Date.now() + 6 * 60 * 60 * 1000; // 6 horas en milisegundos

            localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiration }));

            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido!',
            });

            router.push('/admin/panel');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: error?.response?.data?.message,
            });
        }
    };

    return (
        <Layout title="Login">
            <Header />

            <div className={styles["login-container"]}>
                <section>
                    <div className={styles["form-container"]}>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <h1>Login</h1>
                            </div>
                            <div className={styles.control}>
                                <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Email' autoComplete="Email"/>
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className={styles.control}>
                                <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder='Contraseña' autoComplete="current-password"/>
                                <span className="material-symbols-outlined">lock</span>
                            </div>
                            <div className={styles['control-button']}>
                                <button type="submit">Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Login;