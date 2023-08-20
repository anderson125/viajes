import Link from 'next/link'
import Image from 'next/image'

import styles from './PlansServices.module.css'
import LogoWs from '../../assets/wpp/logo_ws.png'
import LogoRs from '../../assets/wpp/logo_register.png'

import imgCamera from '@/assets/plans/Logo-camara.png'
import imgText from '@/assets/plans/Logo-Texto.png'
import imgWeb from '@/assets/plans/Logo-WEB-WSP.png'

export const PlansServices = () => {
    return (
        <>
            <section>
                <div className={styles["planServices-icons"]}>
                    <div className={styles["icon-plan1"]}>
                        <Image src={imgCamera} alt="imagen camara" width={180} height={50} />
                        <p>10 fotografías</p>
                    </div>
                    <div className={styles["icon-plan1"]}>
                        <Image src={imgText} alt="imagen camara" width={180} height={50} />
                        <p>100 palabras con la</p>
                        <p>información de tu negocio</p>
                    </div>
                    <div className={styles["icon-plan1"]}>
                        <Image src={imgWeb} alt="imagen camara" width={180} height={50} />
                        <p>Enlace a tu página Web</p>
                        <p>y Whatsapp(si tienes)</p>
                    </div>
                </div>
            </section>

            <section className={styles['buttons-align']}>
                <div>
                    <button className={styles['btn-ws']}>
                        <div>
                            <Image src={LogoWs} alt="logo" className={styles['img-ws']} />
                        </div>
                        <div>
                            <Link href="https://api.whatsapp.com/send?phone=573125515919" target='_blank' className={styles['info-ws']}>
                                Escríbenos, comunícate con un asesor
                                <li className={styles['info-number-ws']}>
                                    <p>573125515919</p>
                                </li>
                            </Link>
                        </div>
                    </button>
                </div>
            </section >
        </>
    )
}
