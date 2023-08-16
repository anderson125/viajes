import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import jwt from 'jsonwebtoken';

import styles from './panel.module.css'
import { Header } from "@/components/header/Header";
import { Layout } from "@/components/layouts/Layout";
import Swal from "sweetalert2";

const AdminPanel = () => {
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
  };

  return (
    <Layout title="Panel de administración">
      <Header />

      <div className={styles["grid-container"]}>
        <div className={styles["container-text"]}>
          <h1>Panel Administrativo</h1>
        </div>
        <div className={styles["flex-links"]}>
          <Link href='/customers/create'>Crear Cliente</Link>
          <Link href='/categories/create'>Crear Categoria</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

    </Layout>
  )
}


export default AdminPanel;
