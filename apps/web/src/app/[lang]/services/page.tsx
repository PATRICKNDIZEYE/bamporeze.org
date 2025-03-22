import { Metadata } from "next";
import ServiceBackground from "../../../../assets/images/services-page-background.png";
import { Locale } from "../../../../i18n.config";
import PageHead from "../../../components/units/pageTitle";
import ServicesSection from "../../../sections/services/services";
import { getDictionary } from "../../../utils/dictionary";
import BaseLayout from "../../../components/layouts/baseLayout";

export const metadata: Metadata = {
    title: "Our services",
    description: "Us hcakigali, We provide all mining services to our clients, we swing in our client's way",
    icons: ['/favicon.ico']
}

export default function ServicesPage({ params }: {
    params: {
        lang: Locale
    }
}) {
    const dictionary = getDictionary(params.lang)

    return (
        <>
            <PageHead
                title={dictionary.pages.services.page_title}
                subtitle={dictionary.pages.services.subtitle}
                suptitle={dictionary.pages.services.suptitle}
                backgroundImage={ServiceBackground.src}
            />
            <ServicesSection />
        </>
    )
}

