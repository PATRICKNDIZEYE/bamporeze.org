import AboutSectionOne from '../../sections/homepage/aboutSectionOne'
import AboutSectionTwo from '../../sections/homepage/aboutSectionTwo'
import BlogHighlight from '../../sections/homepage/blogHighlight'
import OurHappyClients from '../../sections/homepage/happyClients'
import Hero from '../../sections/homepage/hero'
import ProductsList from '../../sections/homepage/productsList'
import Reviews from '../../sections/homepage/reviews'
import TrustedCompanies from '../../sections/homepage/trustedCompanies'
import { headers } from 'next/headers'
import HeroSlider from '../../components/units/heroSlider'
import { getSlides } from '../../utils/api'

export default async function Page({ params: { lang } }: { params: { lang: 'en' | 'fr' } }) {
  const getBaseUrl = () => {
    const headersList = headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    return `${protocol}://${host}`
  }

  const slidesResponse = await getSlides();

  return (
    <div className=''>
      <HeroSlider slides={slidesResponse} locale={lang} />
      <TrustedCompanies locale={lang} />
      <AboutSectionOne expanded={false} locale={lang} />
      <AboutSectionTwo locale={lang} />
      {/* <ProductsList locale={lang} /> */}
      <BlogHighlight />
      <Reviews locale={lang} />
      <OurHappyClients locale={lang} />
    </div>
  )
}
