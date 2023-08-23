import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.css';
import LogoHeader from '@/assets/header/header.jpg';

export const Header = () => {
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
                <nav className={styles["index-contenedor-registrateLogin"]}>
                        <Link href="/plans" className={styles["index-registrate"]}>Pauta con nosotros</Link>
                </nav>
            </section>
        </header>
    );
};