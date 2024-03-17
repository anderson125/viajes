import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import Wsp from '../../public/WSP.png';
import Facebk from '../../public/Facebook.png';
import Insta from '../../public/Instagram.png';
import Www from '../../public/www.png';
import Image from 'next/image';

import styles from './ResultsGrid.module.css'

const ResultsGrid = ({ customers }) => {
    // Función para truncar el texto
    const truncateText = (text, maxLength = 28) => {
        if (text.length <= maxLength) {
            return text;
        }
        const truncatedText = text.substring(0, maxLength);
        const lastSpaceIndex = truncatedText.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
            return truncatedText.substring(0, lastSpaceIndex) + '\n' + truncatedText.substring(lastSpaceIndex + 1);
        }
        return truncatedText + '\n' + text.substring(maxLength);
    };

    return (
        <div style={{ padding: '0 10px', maxWidth: '1200px', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={2} justifyContent="center" marginTop='7rem' marginBottom='7rem'>
                {customers.map((customer) => (
                    <Grid item xs={13} sm={10} md={10} key={customer._id}>
                        <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '15px' }}>
                            <CardContent style={{ display: 'flex', alignItems: 'flex-start' }} className='cards-clients' >
                                <div style={{  maxWidth: '220px', marginRight: '1rem' }}>
                                    <img src={`http://api.directorioturismo.com/api/customer/image/${customer.file_01}`} alt="Customer"
                                        className= {styles["customer-image-small"]}
                                    />
                                </div>
                                <div style={{ flex: 1 }} >
                                    <Typography variant="body1" gutterBottom className={styles['description-client']}>{customer.description}</Typography>
                                    <CardContent className={styles['informative-clients-contact']}>
                                        <div>
                                            <Typography variant="body2" color="textSecondary">Teléfono: {truncateText(customer.phone_number)}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="textSecondary">Página Web: {truncateText(customer.link)}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="textSecondary">e-mail: {truncateText(customer.email)}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="body2" color="textSecondary">Dirección: {truncateText(customer.how_to_get)}</Typography>
                                        </div>
                                    </CardContent>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Image src={Wsp} alt="WhatsApp" style={{ width: '20px', height: '20px', marginBottom: '0.9rem' }} />
                                    <Image src={Facebk} alt="Facebook" style={{ width: '20px', height: '20px', marginBottom: '0.9rem' }} />
                                    <Image src={Insta} alt="Instagram" style={{ width: '20px', height: '20px', marginBottom: '0.9rem' }} />
                                    <Image src={Www} alt="Website" style={{ width: '20px', height: '20px', marginBottom: '0.9rem' }} />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ResultsGrid;