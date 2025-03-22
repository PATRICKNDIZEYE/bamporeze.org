import { Text } from "@repo/ui/units";
import Link from "next/link";
import WebSection from "../../components/layouts/websection";
import { getBlogHighlight } from "../../utils/api";

export default async function BlogHighlight() {
    const randomBlog = await getBlogHighlight()
    if (!randomBlog) return null
    return (
        <WebSection about="Blog Highlight" className={`my-12`}>
            <div className="bg-black rounded-xl p-10 flex items-center justify-center">
                <div className="max-w-[1000px] flex flex-col items-center gap-3 ">
                    <Text variant='suptitle' className="text-center ">from our blog</Text>
                    <Text variant='title_2' className="text-center  text-white">
                        {randomBlog.title}
                    </Text>
                    <Text variant='subtitle' className="text-center">Latest release from our blog</Text>
                    <Link href={`/blog`} className="h-[40px] px-3 bg-brand-darkblue-5 text-white"> Visit our blog </Link>
                </div>
            </div>
        </WebSection>
    )
}