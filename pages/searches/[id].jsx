import  ResultsGrid  from "@/components/ResultsGrid/ResultsGrid";
import { useRouter } from 'next/router';
import { HeaderSearchs } from "@/components/headerSearchs/Header";
import { Layout } from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonCards from "@/components/cardsbuttons/ButtonCards";

export const SearchesPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const initialId = id || "default";  

  const [customers, setCustomers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [customersCategories, setCustomersCategories ] = useState([]);

  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      const filteredCustomers = customers.filter((customer) => customer.category_id === categoryId);
      setCustomersCategories(filteredCustomers);
    } else {
      setMatches(customers);
    }
  };

  useEffect(() => {
    if (initialId !== "default") {
      axios.get(`https://api.directorioturismo.com/api/customer/search-customer/?muni=${initialId}`)
        .then((response) => {
          setCustomersCategories([])
          setCustomers(response.data.articles);
          setMatches(response.data.articles);
        })
        .catch((error) => {
          router.push('/404')
        });
    }
  }, [initialId]);

  return (
    <Layout title="Busqueda">
      <HeaderSearchs />
      <ButtonCards onCategoryChange={handleCategorySelect} />
      <ResultsGrid customers={customersCategories} />
    </Layout>
  )
}

export default SearchesPage;