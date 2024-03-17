import styles from './buttonList.module.css'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';


const CategoryButton = ({ name, categories, onCategoryChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryText, setSelectedCategoryText] = useState(name);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (categoryId, categoryText) => {
        setSelectedCategory(categoryId);
        setSelectedCategoryText(categoryText);
        onCategoryChange(categoryId);
        handleMenuClose();
    };

    return (
        <Grid item>
            <Button
                aria-controls={anchorEl ? 'basic-menu' : undefined}
                aria-haspopup="true"
                onMouseEnter={handleMenuOpen}
            >
                {selectedCategoryText}
            </Button>
            <Popover
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography
                    onMouseLeave={handleMenuClose}
                >
                    {categories.map((item) => (
                        <MenuItem
                            className={'list-button'}
                            key={item._id}
                            onClick={() => handleSelect(item._id, item.categorie)}
                        >
                            {item.categorie}
                        </MenuItem>
                    ))}
                </Typography>
            </Popover>
        </Grid >
    );
};

export default CategoryButton;