import { Button, Text } from "@repo/ui/units"
import Image from "next/image"
import PlaceholderImage from "../../../assets/about_pic_2.jpg"
import WebSection from "../../components/layouts/websection"
import { WithLocaleProp } from "../../components/units/navbar"
import SectionTitle from "../../components/units/sectionTitle"
import { Dictionary, getDictionary } from "../../utils/dictionary"

export default function AboutSectionTwo({ locale }: WithLocaleProp) {
    const dictionary: Dictionary = getDictionary(locale)
    return (
        <WebSection about="Our corporate Strategy" className="flex items-start justify-between justify-items-end  msm:flex-col-reverse md:flex-row  md:gap-[120px]  msm:gap-10 py-14">
            <div className="flex flex-col gap-6">
                <SectionTitle
                    direction="horizontal"
                    title={dictionary.pages.home.about_section_two.title}
                    suptitle={dictionary.pages.home.about_section_two.suptitle}
                    subtitle={dictionary.pages.home.about_section_two.subtitle} />

                <Text variant="paragraph" className="leading-loose">
                    {dictionary.pages.home.about_section_two.content}
                </Text>
                <Button variant="secondary" className="md:w-fit msm:w-full flex items-center justify-center">
                    <div className="flex items-center gap-2">
                        {dictionary.common.ctas.read_more}
                    </div>
                </Button>
            </div>
            <Image src={PlaceholderImage.src} width={300} height={300} loading="lazy" alt="Our corporate strategy descriptive image" className="rounded-tr-3xl" />

        </WebSection>
    )
}
