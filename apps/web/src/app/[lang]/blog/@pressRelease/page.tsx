import { Button, Text } from "@repo/ui/units"
import { Locale } from "../../../../../i18n.config"
import Tag from "../../../../components/units/tag"
import { getPressReleases } from "../../../../utils/api"
import { getDictionary } from "../../../../utils/dictionary"
import trim from "../../../../utils/trim"
import Link from "next/link"

export default async function PressRelease({ params }: { params: { lang: Locale } }) {
    const dictionary = getDictionary(params.lang)
    const pressReleasesResponse = await getPressReleases()
    
    // Extract the actual array from the response
    const pressReleases = pressReleasesResponse?.data || []
    
    // Check if we have a valid array
    if (!Array.isArray(pressReleases)) {
        console.error("Invalid press releases format:", pressReleasesResponse)
        return (
            <div className="bg-brand-darkblue-5 p-5 rounded-xl">
                <Text variant="heading2">Press Releases</Text>
                <Text>No press releases available at the moment.</Text>
            </div>
        )
    }
    
    return (
        <div className="flex flex-col items-start gap-3 w-full ">
            <Tag text={dictionary.pages.blog.tags.from_newsletter} />

            <div className="flex flex-col gap-0 w-full">
                <div className="bg-brand-darkblue-5 p-5 rounded-xl">
                    <Text variant="heading2">Press Releases</Text>
                    <div className="flex flex-col divide-y divide-brand-darkblue-10">
                        {
                            // Now we can safely use array methods
                            [...pressReleases].reverse().slice(0, 3).map((pressRelease, index) => (
                                <div 
                                    key={pressRelease.id || index}
                                    className={`p-5 flex flex-col gap-2 cursor-pointer hover:bg-brand-darkblue-5 ${
                                        index !== pressReleases.length - 1 && "border-b border-brand-darkblue-10"
                                    }`}
                                >
                                    <Text variant="heading3">{pressRelease.title.slice(0, 40)}</Text>
                                    <Text variant="paragraph">{trim(pressRelease.description.slice(0, 100))}</Text>
                                    <Link href={`/blog/${pressRelease.id}`}>
                                        <Text className="text-brand-blue underline">Read more</Text>
                                    </Link>
                                </div>
                            ))
                        }
                        <Link href="/blog" className="text-right pt-4">
                            <Text className="text-brand-blue">View all Press Releases</Text>
                        </Link>
                    </div>
                </div>
            </div>
            <a href="#subscribe"><Button variant='tertiary'>Join the newsletter</Button></a>
        </div>
    )
}
