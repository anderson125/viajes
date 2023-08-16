import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './buttons.module.css';

const ButtonCards = ({ onCategoryChange }) => {
  const [categorys, setCategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get('https://api.directorioturismo.com/api/category/get-categories')
      .then((response) => {
        setCategorys(response.data.categories);
      })
      .catch((error) => {
        setCategorys([]);
      });
  }, []);

  const handleButton = (categoryId) => {
    if (selectedCategory === categoryId) {
      // Si el mismo botón se presiona nuevamente, se deselecciona
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    onCategoryChange(categoryId);
  };

  return (
    <div className={styles['card-button']}>
      {categorys.map((item) => (
        <button
          onClick={() => handleButton(item._id)}
          key={item._id}
          className={`${styles['button']} ${selectedCategory === item._id ? styles['selected'] : ''}`}
        >
          {item.categorie}
        </button>
      ))}
    </div>
  );
};

export default ButtonCards;