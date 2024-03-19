import React, { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const CategoryButton = ({ name, categories, onCategoryChange }) => {
    const [selectedCategoryText, setSelectedCategoryText] = useState(name);
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelect = (categoryId, categoryText) => {
        setSelectedCategoryText(categoryText);
        onCategoryChange(categoryId);
    };

    const handleOptionClick = (itemId, itemCategory) => {
        // Lógica para manejar la selección de la opción aquí
        setIsDropdownOpen(false); // Cerrar el menú desplegable al hacer clic en una opción
        handleSelect(itemId, itemCategory); // Aquí debes definir la función handleSelect
    };

    return (
        <ul className='dropdown-section'>
            <li
                className='dropdown-container'
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                <div className='dropdown-section-text' onClick={handleDropdownToggle}>
                    <p>{selectedCategoryText} </p>
                    {isDropdownOpen ? <HorizontalRuleIcon /> : <KeyboardArrowDownIcon />}
                </div>
                {isDropdownOpen && (
                    <ul className='dropdown'>
                        {categories.map((item) => (
                            <li
                                key={item._id}
                                onClick={() => handleOptionClick(item._id, item.categorie)}
                            >
                                {item.categorie}
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        </ul>
    );
};

export default CategoryButton;