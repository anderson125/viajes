import Link from "next/link"

import styles from './footer.module.css'

const FooterMenu = () => {
    return (
            <div className={styles['footer-container']}>
                <p>
                    © Copyright 2023 - Todos los derechos reservados directorioturismo.com - <Link href='/terminosycondiciones'>AVISO LEGAL</Link>
                </p>
            </div>
    )
}

export default FooterMenu