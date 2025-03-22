import { Metadata } from "next";
import AboutBackground from "../../../../assets/images/about-page-background.png";
import { Locale } from "../../../../i18n.config";
import PageHead from "../../../components/units/pageTitle";
import AboutAimCards from "../../../sections/about/aimCards";
import BoardOfDirectors from "../../../sections/about/board";
import AboutSectionOne from "../../../sections/homepage/aboutSectionOne";
import AboutSectionTwo from "../../../sections/homepage/aboutSectionTwo";
import { getDictionary } from "../../../utils/dictionary";


export const metadata: Metadata = {
    title: "About us",
    description: "Learn more about hcakigali, our team, our corporate strategy and much more",
    icons: ['/favicon.ico']
}


export default function AboutPage({ params }: {
    params: {
        lang: Locale
    }
}) {

    const dictionary = getDictionary(params.lang)
    return (
        <>
            <PageHead
                title={dictionary.pages.about.page_title}
                suptitle={dictionary.pages.about.suptitle}
                subtitle={dictionary.pages.about.subtitle}
                backgroundImage={AboutBackground.src}
                padBottom={true}
            />
            <AboutAimCards locale={params.lang} />
            <AboutSectionOne expanded={true} locale={params.lang} />
            <AboutSectionTwo locale={params.lang} />
            <BoardOfDirectors locale={params.lang} />
        </>
    )
}