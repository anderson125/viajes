import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './Header.module.css';
import LogoHeader from '@/assets/header/header.jpg';
import jwt from 'jsonwebtoken';
import Swal from 'sweetalert2';

export const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('nestedToken');
        const jwtSecret = process.env.JWT_SECRET;
        
    
        try {
          const decodedToken = jwt.decode(isLoggedIn);
    
          if (!decodedToken) {
            localStorage.removeItem('nestedToken');
            return;
          }
          if (decodedToken.signature !== jwtSecret) {
            localStorage.removeItem('nestedToken');
          }
          setIsLoggedIn(true);
        } catch (error) {
          setIsLoggedIn(false)
        }
      }, []);

    const handleLogout = () => {
        localStorage.removeItem('nestedToken');
        Swal.fire({
            icon: 'success',
            title: '¡Logout Exitoso!',
            text: 'Has cerrado sesión correctamente.',
            confirmButtonText: 'Aceptar',
        }).then((result) => {
            router.push('/authentication/login')
        });
        setIsLoggedIn(false);
    };

    return (
        <header>
            <section className={styles["container-header"]}>
                <Link href="/directory" className={styles["logo-directorioTuristico"]}>
                    <Image
                        className={styles["header-logo"]}
                        src={LogoHeader}
                        alt="Logo de la empresa"
                        width={240}
                        height={10}
                        priority="true"
                    />
                </Link>
                <nav className={styles["index-contenedor-registrateLogin"]}>
                    {isLoggedIn === true ? (
                        <>
                            <Link href="/plans" className={styles["index-registrate-admin"]}>Pauta con nosotros</Link>
                            <Link href="/admin/panel" className={styles["index-registrate-admin"]}>Panel Administrador</Link>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </>
                    ) : (
                        <Link href="/plans" className={styles["index-registrate"]}>Pauta con nosotros</Link>
                    )}
                </nav>
            </section>
        </header>
    );
};