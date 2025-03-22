import { Metadata } from "next";
import WebSection from "../../../components/layouts/websection";

export const metadata: Metadata = {
    title: "Our blog",
    description: "Read blogs and articles from hcakigali",
    icons: ['/favicon.ico']
}


export default function Layout({ children, pressRelease, allBlogs }: any) {
    return (
        <WebSection about="blogs" animate={false}>
            <div className="grid md:grid-cols-3 msm:grid-cols-1 py-10 gap-10">
                <div className="col-span-2">
                    {children}
                </div>
                <div>
                    {pressRelease}
                </div>
            </div>
            <div className="">
                {allBlogs}
            </div>
        </WebSection>
    )
}