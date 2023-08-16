import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../../../styles/login.module.css';
import { Layout } from '@/components/layouts/Layout';
import { Header } from '@/components/header/Header';
import Swal from 'sweetalert2';

const Login = () => {

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('nestedToken');
    
        if (isLoggedIn) {
          router.push('/admin/panel');
        }
      }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

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
        console.log(userData);

        try {
            const response = await axios.post('https://api.directorioturismo.com/api/user/login', userData);

            const { token } = response.data;

            localStorage.setItem('nestedToken', token);

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
