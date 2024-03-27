import ResultsGrid from "@/components/ResultsGrid/ResultsGrid";
import { useRouter } from 'next/router';
import { HeaderSearchs } from "@/components/headerSearchs/Header";
import { Layout } from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonCards from "@/components/cardsbuttons/ButtonCards";

import imgInformativa from '../../assets/resultgrid/exgordita.svg';
import imgLupa from '../../assets/resultgrid/exlupa.svg'; // Importa la nueva imagen
import Image from "next/image";

export const SearchesPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const initialId = id || "default";

    const [customers, setCustomers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [customersCategories, setCustomersCategories] = useState([]);

    const [showImage, setShowImage] = useState(false);
    const [showImageT, setShowImageT] = useState(false);

    const handleCategorySelect = (categoryId) => {
        if (categoryId) {
            const filteredCustomers = customers.filter((customer) => customer.category_id === categoryId);
            setCustomersCategories(filteredCustomers);
            setShowImageT(false)
            setShowImage(filteredCustomers.length === 0); // Muestra la imagen de la lupa solo si no hay clientes después de la selección
        } else {
            setMatches(customers);
        }
    };

    useEffect(() => {
        setShowImage(false)
        if (initialId !== "default") {
            axios.get(`https://api.directorioturismo.com/api/customer/search-customer/?muni=${initialId}`)
                .then((response) => {
                    setCustomersCategories([])
                    setCustomers(response.data.articles);
                    setMatches(response.data.articles);
                    setShowImageT(true)
                })
                .catch((error) => {
                });
        }
    }, [initialId]);

    return (
        <Layout title="Busqueda">
            <HeaderSearchs />
            <ButtonCards onCategoryChange={handleCategorySelect} />

            {showImageT && ( // Asegura que la imagen de la lupa solo se muestre si showImage es verdadero y customersCategories está vacío
                <div className="image-resultgrid">
                    <Image src={imgInformativa} alt="Lupa Image" />
                </div>
            )}

            {showImage && ( // Asegura que la imagen de la lupa solo se muestre si showImage es verdadero y customersCategories está vacío
                <div className="image-resultgrid-lupa">
                    <Image src={imgLupa} alt="Lupa Image" />
                </div>
            )}
            <ResultsGrid customers={customersCategories} />
        </Layout>
    );
};

export default SearchesPage;
