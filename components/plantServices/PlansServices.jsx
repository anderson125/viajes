import Link from 'next/link'
import Image from 'next/image'

import styles from './PlansServices.module.css'
import LogoWs from '../../assets/wpp/logo_ws.png'

import imgCamera from '@/assets/plans/Logo-camara.png'
import imgText from '@/assets/plans/Logo-Texto.png'
import imgWeb from '@/assets/plans/Logo-WEB-WSP.png'

export const PlansServices = () => {
    return (
        <>
            <section>
                <div className={styles["planServices-icons"]}>
                    <div className={styles["icon-plan1"]}>
                        <Image src={imgCamera} alt="imagen camara" width={200} height={160} priority="true" />
                        <p>Una imagen del logo de tu empresa</p>
                        <p>o fotografía de tu negocio</p>
                    </div>
                    <div className={styles["icon-plan1"]}>
                        <Image src={imgText} alt="imagen camara" width={200} height={160} priority="true" />
                        <p>Hasta 50 palabras con la</p>
                        <p>información de tu negocio.</p>
                    </div>
                    <div className={styles["icon-plan1"]}>
                        <Image src={imgWeb} alt="imagen camara" width={200} height={160} priority="true" />
                        <p>Enlace a tu página Web</p>
                        <p>y Whatsapp(si tienes)</p>
                    </div>
                </div>
            </section>

            <section className={styles['buttons-align']}>
                <div>
                    <button className={styles['btn-ws']}>
                        <div>
                            <Image src={LogoWs} alt="logo" className={styles['img-ws']} priority="true"  />
                        </div>
                        <div>
                            <div className={styles['info-ws']}>
                                <span>Informes al whatsapp</span>
                                <li className={styles['info-number-ws']}>
                                    <p>3125515919</p>
                                </li>
                            </div>
                        </div>
                    </button>
                </div>
            </section >
        </>
    )
}
