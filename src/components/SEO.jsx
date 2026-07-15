import { Helmet } from 'react-helmet-async'
import { useTranslation } from '../context/LanguageContext'

const seoData = {
  en: {
    title: 'Layla Rodas | Backend Developer, Automation & ERP Integrations',
    description: 'Backend developer working with Python, Java, APIs, ERP integrations, automation, OCR workflows and business data solutions.',
    keywords: 'Layla Rodas, backend developer, Python, Java, APIs, ERP integrations, automation, OCR, Playwright, Power BI, Palma de Mallorca',
    ogTitle: 'Layla Rodas | Backend Developer, Automation & ERP Integrations',
    ogDescription: 'Backend developer working with Python, Java, APIs, ERP integrations, automation, OCR workflows and business data solutions.',
    locale: 'en_US',
    language: 'English',
  },
  es: {
    title: 'Layla Rodas | Backend Developer, Automation & ERP Integrations',
    description: 'Desarrolladora backend con Python, Java, APIs, integraciones ERP, automatización, flujos OCR y soluciones de datos empresariales.',
    keywords: 'Layla Rodas, desarrolladora backend, Python, Java, APIs, integraciones ERP, automatización, OCR, Playwright, Power BI, Palma de Mallorca',
    ogTitle: 'Layla Rodas | Backend Developer, Automation & ERP Integrations',
    ogDescription: 'Desarrolladora backend con Python, Java, APIs, integraciones ERP, automatización, flujos OCR y soluciones de datos empresariales.',
    locale: 'es_ES',
    language: 'Spanish',
  },
}

const baseUrl = 'https://layla-portfolio-zeta.vercel.app'

function SEO() {
  const { language } = useTranslation()
  const data = seoData[language] || seoData.en
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
          knowsAbout: ['Python', 'Java', 'PHP', 'SQL', 'REST APIs', 'ERP Integrations', 'Automation', 'Playwright', 'Power BI', 'OCR'],
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
