import { Helmet } from 'react-helmet-async'
import { useTranslation } from '../context/LanguageContext'

const seoData = {
  en: {
    title: 'Layla Rodas | Backend Developer - Java, Spring Boot, SQL',
    description: 'Backend Developer based in Palma de Mallorca, Spain. Focused on data, structure, and clean architecture. Building RESTful APIs and database-driven applications with Java, Spring Boot, and SQL.',
    keywords: 'Layla Rodas, backend developer, Java, Spring Boot, SQL, REST APIs, JPA, databases, data-oriented, Python, portfolio, Palma de Mallorca, Spain, software developer',
    ogTitle: 'Layla Rodas | Backend Developer',
    ogDescription: 'Backend Developer focused on data, structure, and clean architecture. Java, Spring Boot, SQL.',
    locale: 'en_US',
    language: 'English',
  },
  es: {
    title: 'Layla Rodas | Backend Developer - Java, Spring Boot, SQL',
    description: 'Desarrolladora Backend en Palma de Mallorca, España. Enfocada en datos, estructura y arquitectura limpia. Construyendo APIs RESTful y aplicaciones basadas en bases de datos con Java, Spring Boot y SQL.',
    keywords: 'Layla Rodas, desarrolladora backend, Java, Spring Boot, SQL, REST APIs, JPA, bases de datos, data-oriented, Python, portfolio, Palma de Mallorca, España, desarrolladora software',
    ogTitle: 'Layla Rodas | Backend Developer',
    ogDescription: 'Desarrolladora Backend enfocada en datos, estructura y arquitectura limpia. Java, Spring Boot, SQL.',
    locale: 'es_ES',
    language: 'Spanish',
  },
}

const baseUrl = 'https://layla-portfolio-zeta.vercel.app'

function SEO() {
  const { language } = useTranslation()
  const data = seoData[language] || seoData.es
  const altLang = language === 'es' ? 'en' : 'es'
  const altData = seoData[altLang]

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={language} />
      <title>{data.title}</title>
      <meta name="title" content={data.title} />
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta name="language" content={data.language} />

      {/* Alternate Language Tags */}
      <link rel="alternate" hrefLang={language} href={baseUrl} />
      <link rel="alternate" hrefLang={altLang} href={baseUrl} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:title" content={data.ogTitle} />
      <meta property="og:description" content={data.ogDescription} />
      <meta property="og:locale" content={data.locale} />
      <meta property="og:locale:alternate" content={altData.locale} />

      {/* Twitter Card */}
      <meta name="twitter:title" content={data.ogTitle} />
      <meta name="twitter:description" content={data.ogDescription} />

      {/* JSON-LD Structured Data - Dynamic */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Layla Rodas',
          url: baseUrl,
          image: `${baseUrl}/og-image.svg`,
          jobTitle: 'Backend Developer',
          description: data.description,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Palma de Mallorca',
            addressCountry: 'ES',
          },
          email: 'rodas.layla@gmail.com',
          sameAs: [
            'https://github.com/laylarodas',
            'https://www.linkedin.com/in/laylarodas/',
          ],
          knowsAbout: ['Java', 'Spring Boot', 'SQL', 'REST APIs', 'JPA', 'MySQL', 'PostgreSQL', 'Python', 'Data Analysis'],
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'DAM - Desarrollo de Aplicaciones Multiplataforma',
          },
        })}
      </script>
    </Helmet>
  )
}

export default SEO
