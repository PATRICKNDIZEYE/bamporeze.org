import { Metadata } from "next"
import ContactUSBackground from "../../../../assets/images/careers-page-background.png"
import { Locale } from "../../../../i18n.config"
import PageHead, { IPageHeadProps } from "../../../components/units/pageTitle"
import { getDictionary } from "../../../utils/dictionary"

export const metadata: Metadata = {
    title: "Contact us",
    description: "Get in touch with hcakigali, ask more, send feedback and more",
    icons: ['/favicon.ico']
}


export default function Layout({ children, params }: { children: any, params: { lang: Locale } }) {
    const dictionary = getDictionary(params.lang)
    const pageMeta: IPageHeadProps = {
        title: dictionary.pages.contact_us.title,
        suptitle: dictionary.pages.contact_us.suptitle,
        subtitle: dictionary.pages.contact_us.subtitle,
        backgroundImage: ContactUSBackground.src
    }


    return (
        <div>
            <PageHead {...pageMeta} />
            {children}
        </div>
    )
}