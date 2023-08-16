import Link from 'next/link'
import styles from './SearchButtons.module.css'
import ButtonCards from '../cardsbuttons/ButtonCards';

export const SearchesServicesButton = ({ customers }) => {
    return (
        <nav className={styles["grid-container"]}>
            <ButtonCards customers={customers}/>
        </nav>
    )
}
