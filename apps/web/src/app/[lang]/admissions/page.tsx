import { Metadata } from "next";
import { Locale } from "../../../../i18n.config";
import HiringProcess from "../../../sections/careers/hiringProcess";
import OpenPositions from "../../../sections/careers/openPositions";
import Values from "./values";
export const revalidate = 30;
export const metadata: Metadata = {
    title: "Careers | RwandAir Catering Ltd. | Inflight Catering  |   Fast growing catering service in Rwanda",
    description: "Explore careers and open positions at RwandAir Catering. Join our team and contribute to the growth of a leading inflight catering company.",
    icons: ['/favicon.ico'],
    openGraph: {
        title: "Careers | RwandAir Catering Ltd. | Inflight Catering  |   Fast growing catering service in Rwanda",
        description: "Explore careers and open positions at RwandAir Catering. Join our team and contribute to the growth of a leading inflight catering company.",
    }
}

export default function Page({ params }: { params: { lang: Locale } }) {
    return (
        <>
            {/* <ValuesSection locale={params.lang} /> */}
            {/* <Values lang={params.lang} /> */}
            <OpenPositions locale={params.lang} />
            <HiringProcess locale={params.lang} />
        </>
    )
}