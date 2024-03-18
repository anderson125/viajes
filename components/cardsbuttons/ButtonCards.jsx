import CategoryButton from "../buttonList/ButtonList";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';


const ButtonCards = ({ onCategoryChange }) => {
    const [categories, setCategories] = useState([]);
    const [mainCategories, setMainCategories] = useState([]);
    const [mainCategoriesServices, setMainCategoriesServices] = useState([]);
    const [mainCategoriesOthers, setMainCategoriesOthers] = useState([]);
  
    useEffect(() => {
      axios
        .get('https://api.directorioturismo.com/api/category/get-categories')
        .then((response) => {
          const main = ['hoteles', 'ecohoteles', 'camping', 'glamping', 'alquiler de fincas', 'cabañas'];
          const mainServices = ['agencias de viajes', 'operadores turísticos', 'guías turísticos','centros recreativos', 'parques temáticos', 'reservas naturales', 'museos'];
          const mainOyhers = ['restaurantes', 'artesanías', 'transporte']; 
          const allCategories = response.data.categories;
          const mainCats = allCategories.filter((item) => main.includes(item.categorie.toLowerCase()));
          const mainCatsServices = allCategories.filter((item) => mainServices.includes(item.categorie.toLowerCase()));
          const mainCatsOthers = allCategories.filter((item) => mainOyhers.includes(item.categorie.toLowerCase()));
          setMainCategories(mainCats);
          setMainCategoriesServices(mainCatsServices);
          setMainCategoriesOthers(mainCatsOthers);
          setCategories(allCategories);
        })
        .catch((error) => {
          setCategories([]);
        });
    }, []);
  
    return (
      <Grid container justifyContent="center" className="buttons-list-menu" spacing={1}>
        <CategoryButton name="Hospedaje" categories={mainCategories} onCategoryChange={onCategoryChange} />
        <CategoryButton name="Servicios turísticos" categories={mainCategoriesServices} onCategoryChange={onCategoryChange} />
        <CategoryButton name="Otros servicios" categories={mainCategoriesOthers} onCategoryChange={onCategoryChange} />
      </Grid>
    );
  };

export default ButtonCards;