import { Helmet } from 'react-helmet-async'
import { useTranslation } from '../context/LanguageContext'

const seoData = {
  en: {
    title: 'Layla Rodas | Data & Backend Developer - SQL, Python, ERP',
    description: 'Junior Data & Backend Developer based in Palma de Mallorca, Spain. Focused on business data, SQL, ERP integrations, automation and validation pipelines.',
    keywords: 'Layla Rodas, data backend developer, SQL, Python, PHP, ERP integrations, business data, OCR, automation, data validation, portfolio, Palma de Mallorca, Spain',
    ogTitle: 'Layla Rodas | Data & Backend Developer',
    ogDescription: 'Business Data · SQL · ERP Integrations · Automation. Junior developer with practical ERP and data workflow experience.',
    locale: 'en_US',
    language: 'English',
  },
  es: {
    title: 'Layla Rodas | Data & Backend Developer - SQL, Python, ERP',
    description: 'Junior Data & Backend Developer en Palma de Mallorca, España. Enfocada en datos de negocio, SQL, integraciones ERP, automatización y pipelines de validación.',
    keywords: 'Layla Rodas, desarrolladora data backend, SQL, Python, PHP, integraciones ERP, datos de negocio, OCR, automatización, validación de datos, portfolio, Palma de Mallorca, España',
    ogTitle: 'Layla Rodas | Data & Backend Developer',
    ogDescription: 'Business Data · SQL · ERP Integrations · Automation. Desarrolladora junior con experiencia práctica en ERP y flujos de datos.',
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
      <html lang={language} />
      <title>{data.title}</title>
      <meta name="title" content={data.title} />
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta name="language" content={data.language} />

      <link rel="alternate" hrefLang={language} href={baseUrl} />
      <link rel="alternate" hrefLang={altLang} href={baseUrl} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />

      <meta property="og:title" content={data.ogTitle} />
      <meta property="og:description" content={data.ogDescription} />
      <meta property="og:locale" content={data.locale} />
      <meta property="og:locale:alternate" content={altData.locale} />

      <meta name="twitter:title" content={data.ogTitle} />
      <meta name="twitter:description" content={data.ogDescription} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Layla Rodas',
          url: baseUrl,
          image: `${baseUrl}/og-image.svg`,
          jobTitle: 'Data & Backend Developer',
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
          knowsAbout: ['SQL', 'Python', 'PHP', 'ERP Integrations', 'Business Data', 'Data Validation', 'OCR', 'Automation', 'MySQL'],
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
