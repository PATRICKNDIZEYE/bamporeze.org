import HeroSlider from "../../components/units/heroSlider";
import { WithLocaleProp } from "../../components/units/navbar";
import { getSlides } from "../../utils/api";


export default async function Hero(props: WithLocaleProp) {
    try {
        const slides = await getSlides()
        // Add error handling for empty slides
        if (!slides || slides.length === 0) {
            return null
        }
        return <HeroSlider slides={slides} locale={props.locale} />
    } catch (error) {
        console.error('Error loading slides:', error)
        return null
    }
}

// Add proper URL construction when handling slides
const handleSlideUpload = async (file: File) => {
  try {
    const baseUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
    // Rest of upload logic...
  } catch (error) {
    console.error('Error uploading slide:', error)
  }
}