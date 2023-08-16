import  ResultsGrid  from "@/components/ResultsGrid/ResultsGrid";
import { useRouter } from 'next/router';
import { HeaderSearchs } from "@/components/headerSearchs/Header";
import { Layout } from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonCards from "@/components/cardsbuttons/ButtonCards";

export const SearchesPage = () => {
  const [customers, setCustomers] = useState([]);
  const [matches, setMatches] = useState([]);

  const handleCategorySelect = (categoryId) => {
    if (categoryId) {
      const filteredCustomers = customers.filter((customer) => customer.category_id === categoryId);
      setMatches(filteredCustomers);
    } else {
      setMatches(customers);
    }
  };

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios.get(`https://api.directorioturismo.com/api/customer/search-customer/?${id}`)
      .then((response) => {
        setCustomers(response.data.articles);
        setMatches(response.data.articles);
      })
      .catch((error) => {
        setCustomers([]);
        setMatches([]);
      });
  }, [id]);

  return (
    <Layout title="Busqueda">
      <HeaderSearchs />
      <ButtonCards onCategoryChange={handleCategorySelect} />
      <ResultsGrid customers={matches} />
    </Layout>
  )
}

export default SearchesPage;