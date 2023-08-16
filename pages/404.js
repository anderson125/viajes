import Link from "next/link";
import Image from "next/image";

import { Header } from "@/components/header/Header";
import { Layout } from "@/components/layouts/Layout";

import error404 from '../assets/404/error404.svg'
import styles from '../styles/error.module.css'

export default function NotFound() {
  return (
    <Layout title="Pagina no encontrada">
      <Header />
      
      <main className={styles.container}>

        <div className={styles.image}>
          <Image src={error404} alt="Eror Logo"/>
        </div>

        <div className={styles.text}>
          <h3>Ups</h3>
          <p>La pagina a la que intentaste acceder no fue encontrada</p>
        </div>

        <div className={styles.linkhome}>
          <Link href='/directory'>Volver Al Home</Link>
        </div>

      </main>
    </Layout>
  )
}