import { Button, Text } from "@repo/ui/units"
import Image from "next/image"
import PlaceholderImage from "../../../assets/about_pic_1.jpg"
import { Locale } from "../../../i18n.config"
import WebSection from "../../components/layouts/websection"
import SectionTitle from "../../components/units/sectionTitle"
import { Dictionary, getDictionary } from "../../utils/dictionary"

export default function AboutSectionOne({ expanded, locale }: { expanded: boolean, locale: Locale }) {
    const dictionary: Dictionary = getDictionary(locale)
    return (
        <WebSection about="Our corporate Strategy" className="flex items-start justify-between justify-items-end msm:flex-col md:flex-row  md:gap-[120px]  msm:gap-10 py-14">
            <Image src={PlaceholderImage.src} width={500} loading="lazy" height={500} alt="Our corporate strategy descriptive image" className="rounded-tl-3xl" />
            <div className="flex flex-col gap-6">
                <SectionTitle
                    direction="horizontal"
                    title={dictionary.pages.home.about_section_one.title}
                    suptitle={dictionary.pages.home.about_section_one.suptitle}
                    subtitle={dictionary.pages.home.about_section_one.subtitle} />

                <Text variant="paragraph" className="">
                    {dictionary.pages.home.about_section_one.content.slice(1, 200)}
                </Text>
                {expanded &&
                    <Text variant="paragraph" className="leading-loose">
                        {dictionary.pages.home.about_section_one.content}
                    </Text>}
                <Button variant="secondary" className="md:w-fit msm:w-full flex items-center justify-center">
                    <div className="flex items-center gap-2">
                        {dictionary.common.ctas.read_more}
                    </div>
                </Button>
            </div>
        </WebSection>
    )
}
