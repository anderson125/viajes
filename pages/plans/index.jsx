import { Header } from "@/components/header/Header"
import { Layout } from "@/components/layouts/Layout"
import { PlansServices } from "@/components/plantServices/PlansServices"

const PlansPage = () => {
  return (
    <Layout title="Pauta Con Nosotros">
      <Header />

      <section className="parrafoPauta">
            <h1>PAUTA CON NOSOTROS</h1>
            <div className="text-pauta">
              <p>Amigo empresario del sector turismo, construyamos juntos el directorio turístico más grande de Colombia y permite que los clientes te encuentren de manera fácil, rápida y sin intermediarios. </p>
            </div>
      </section>
      
      <PlansServices />
    </Layout>
  )
}

export default PlansPage
