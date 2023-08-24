import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './buttons.module.css';

const ButtonCards = ({ onCategoryChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [mainCategories, setMainCategories] = useState([]);
    const [otherCategories, setOtherCategories] = useState([]);

    useEffect(() => {
        axios
            .get('https://api.directorioturismo.com/api/category/get-categories')
            .then((response) => {
                const main = ['hoteles', 'ecohoteles', 'camping', 'alquiler de fincas', 'cabañas'];
                const allCategories = response.data.categories;
                const mainCats = allCategories.filter(item => main.includes(item.categorie.toLowerCase()));
                const otherCats = allCategories.filter(item => !main.includes(item.categorie.toLowerCase()));
                setMainCategories(mainCats);
                setOtherCategories(otherCats);
                setCategories(allCategories);
            })
            .catch((error) => {
                setCategories([]);
            });
    }, []);

    const handleSelect = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
        onCategoryChange(categoryId);
    };

    return (
        <div className={styles['card-button']}>
            <div className={styles['div-select']}>
                <select
                    value={selectedCategory}
                    onChange={handleSelect}
                    className={styles['select']}
                >
                    <option value="">hospedaje</option>
                    {mainCategories.map(item => (
                        <option key={item._id} value={item._id}>
                            {item.categorie}
                        </option>
                    ))}
                </select>
                <span class="material-symbols-outlined">
                    expand_more
                </span>
            </div>



            <div className={styles['button-container']}>
                {otherCategories.slice(0, 4).map(item => (
                    <button
                        key={item._id}
                        onClick={() => handleSelect({ target: { value: item._id } })}
                        className={`${styles['button']} ${selectedCategory === item._id ? styles['selected'] : ''}`}
                    >
                        {item.categorie}
                    </button>
                ))}
            </div>
            {otherCategories.length > 4 && (
                <div className={styles['div-select']}>
                    <select
                        value={selectedCategory}
                        onChange={handleSelect}
                        className={`${styles['select']}`}
                    >
                        <option value="">Otros</option>
                        {otherCategories.slice(4).map(item => (
                            <option key={item._id} value={item._id}>
                                {item.categorie}
                            </option>
                        ))}
                    </select>
                    <span class="material-symbols-outlined">
                        expand_more
                    </span>
                </div>
            )}

        </div>
    );
};

export default ButtonCards;