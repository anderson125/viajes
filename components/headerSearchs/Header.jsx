import Link from 'next/link'
import Image from 'next/image'

import styles from './HeaderSearchs.module.css'
import { SearchBar } from '../searchBar/SearchBar'
import LogoHeader from '@/assets/header/header.jpg'

export const HeaderSearchs = () => {
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
                    />
                </Link>
                <SearchBar />
                <nav className={styles["index-contenedor-registrateLogin"]}>
                        <div className={styles['container-client']}>
                            <Link href="/plans" className={styles["index-registrate"]}>Pauta con nosotros</Link>
                        </div>
                </nav>
            </section>
        </header>
    )
}
