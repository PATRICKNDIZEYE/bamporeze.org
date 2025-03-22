'use client'
import { usePathname } from "next/navigation";
import CareersBackground from "../../../../assets/images/careers-page-background.png"
import { Locale } from "../../../../i18n.config";
import PageHead, { IPageHeadProps } from "../../../components/units/pageTitle";
import { getDictionary } from "../../../utils/dictionary";
import Values from "./values";

export default function CareersLayout({ children, params }: { children: React.ReactNode, params: { lang: Locale } }) {
    const pathname = usePathname();
    const dictionary = getDictionary(params.lang)
    const pageMeta: IPageHeadProps = {
        title: dictionary.pages.careers.page_title,
        subtitle: dictionary.pages.careers.subtitle,
        suptitle: dictionary.pages.careers.suptitle,
        backgroundImage: CareersBackground.src,
        padBottom: false,
        withBg: true
    }
    
    return (
        <>
            <div className="relative">
                <PageHead {...pageMeta} />
            </div>
            <div className="container mx-auto px-4 py-12">
                {children}
            </div>
            <Values lang={params.lang} />
        </>
    )
}