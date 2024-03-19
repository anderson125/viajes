import React, { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const CategoryButton = ({ name, categories, onCategoryChange }) => {
    const [selectedCategoryText, setSelectedCategoryText] = useState(name);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleSelect = (categoryId, categoryText) => {
        onCategoryChange(categoryId);
        setSelectedCategoryText(categoryText)
    };

    return (
        <ul className='dropdown-section'>
            <li
                className='dropdown-container'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className='dropdown-section-text'>
                    <p>{selectedCategoryText} </p>
                    {isHovered ? <HorizontalRuleIcon /> : <KeyboardArrowDownIcon />}
                </div>
                <ul className='dropdown'>
                    {categories.map((item) => (
                        <li
                            key={item._id}
                            onClick={() => handleSelect(item._id, item.categorie)}
                        >
                            {item.categorie}
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
    );
};

export default CategoryButton;