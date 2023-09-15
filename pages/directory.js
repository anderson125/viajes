import ButtonCards from "@/components/cardsbuttons/ButtonCards";
import FooterMenu from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Layout } from "@/components/layouts/Layout";
import { SearchBar } from "@/components/searchBar/SearchBar";

export default function Home() {
  return (
    <Layout title="Directory">
      <Header />
      <h1 className="titulo-viaje">¡Es el momento de viajar por Colombia!</h1>
      <SearchBar />

      <section className="container-slogan">
        <p className="slogan__services--p">Encuentra hoteles, agencias de viajes, operadores turísticos, guías...</p>
      </section>
    </Layout>
    
  )
}
