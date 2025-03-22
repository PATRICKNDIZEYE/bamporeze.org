import { Locale } from "../../../i18n.config";
import Subscribe from "../../sections/homepage/subscribe";
import Footer from "../units/footer";
import Navbar from "../units/navbar";

export default function BaseLayout({ children, locale }: { children: React.ReactNode | React.ReactNodeArray, locale: Locale }) {
    return (
        <div className="w-screen">
            <Navbar locale={locale} />
            {children}
            <Subscribe locale={locale} />
            <Footer locale={locale} />
        </div>
    )
}