import Head from "next/head"

export const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Directorio Turístico'}</title>
        <meta name="author" content="Directorio Turístico" />
        <meta name="description" content={`Información sobre Turismo Colombia`} />
        <meta name="keywords" content={`${title}, Turismo Colombia, Hospedaje, Guias Turístico, centros recreativos`} />

        <meta property="og:title" content={`Información sobre Directorio Turístico`} />
        <meta property="og:description" content={`esta es la página sobre Turismo`} />
        
      </Head>

      <main>
        {children}
      </main>
    </>
  )
}
