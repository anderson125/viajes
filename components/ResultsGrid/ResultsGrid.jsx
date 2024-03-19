import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import Wsp from '../../public/WSP.png';
import Facebk from '../../public/Facebook.png';
import Insta from '../../public/Instagram.png';
import Www from '../../public/www.png';
import Image from 'next/image';

import styles from './ResultsGrid.module.css'
import Link from 'next/link';

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
                                <div style={{ maxWidth: '220px', marginRight: '1rem' }}>
                                    <img src={`http://api.directorioturismo.com/api/customer/image/${customer.file_01}`} alt="Customer"
                                        className={styles["customer-image-small"]}
                                    />
                                </div>
                                <div style={{ flex: 1 }} >
                                    <Typography variant="body1" gutterBottom className={styles['description-client']}>{customer.description}</Typography>
                                    <CardContent className={styles['informative-clients-contact']}>
                                        {customer.phone_number && customer.phone_number.trim() !== '' && customer.phone_number !== 'null' && (
                                            <div>
                                                <Typography variant="body2" color="textSecondary">Teléfono: {truncateText(customer.phone_number)}</Typography>
                                            </div>
                                        )}
                                        {customer.link && customer.link.trim() !== '' && customer.link !== 'null' &&  (
                                            <div>
                                                <Typography variant="body2" color="textSecondary">Página Web: {truncateText(customer.link)}</Typography>
                                            </div>
                                        )}
                                        {customer.email && customer.email.trim() !== '' && customer.email !== 'null' && (
                                            <div>
                                                <Typography variant="body2" color="textSecondary">e-mail: {truncateText(customer.email)}</Typography>
                                            </div>
                                        )}
                                        {customer.how_to_get && customer.how_to_get !== 'null' &&customer.how_to_get.trim() !== '' && (
                                            <div>
                                                <Typography variant="body2" color="textSecondary">Dirección: {truncateText(customer.how_to_get)}</Typography>
                                            </div>
                                        )}
                                    </CardContent>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    {customer.whatsapp || customer.phone_number &&
                                        <Link href={`https://wa.me/+57${customer.phone_number}` || '/'} passHref target="_blank">
                                            <Image src={Wsp} alt="WhatsApp" style={{ width: '20px', height: '20px', marginBottom: '0.9rem' }} />
                                        </Link>
                                    }
                                    {customer.facebook &&
                                        <Link href={customer.facebook || '/'} passHref target='_blank'>
                                            <Image src={Facebk} alt="Facebook" style={{ width: '20px', height: '20px', marginBottom: '0.9rem' }} />
                                        </Link>
                                    }
                                    {customer.instagram &&
                                        <Link href={customer.instagram || '/'} passHref target="_blank">
                                            <Image src={Insta} alt="Instagram" style={{ width: '20px', height: '20px', marginBottom: '0.9rem' }} />
                                        </Link>
                                    }
                                    {customer.link &&
                                        <Link href={customer.link || '/'} passHref target="_blank">
                                            <Image src={Www} alt="Website" style={{ width: '20px', height: '20px', marginBottom: '0.9rem' }} />
                                        </Link>
                                    }
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