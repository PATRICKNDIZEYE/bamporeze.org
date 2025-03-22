import Image from "next/image";
import Cassiterite from "../../../assets/images/casittererite.jpg";
import Gold from "../../../assets/images/gold.jpg";
import Sulfur from "../../../assets/images/sulfur.jpg";
import Tungsten from "../../../assets/images/tungsten.jpg";
import WebSection from "../../components/layouts/websection";
import { WithLocaleProp } from "../../components/units/navbar";
import SectionTitle from "../../components/units/sectionTitle";
import { getDictionary } from "../../utils/dictionary";
export default function ProductsList({ locale }: WithLocaleProp) {
    const dictionary = getDictionary(locale)
    return (
        <WebSection about="Our products" className="bg-white py-14 flex flex-col gap-16">
            <SectionTitle
                direction="horizontal"
                title={dictionary.pages.home.products.title}
                subtitle={dictionary.pages.home.products.subtitle}
                suptitle={dictionary.pages.home.products.suptitle} />
            <div className="grid md:grid-cols-4 msm:grid-cols-2 gap-4">
                <Image loading="lazy" src={Gold.src} width={500} height={500} alt="Our corporate strategy descriptive image" className=" h-full rounded-xl shadowed " />
                <Image loading="lazy" src={Cassiterite.src} width={500} height={500} alt="Our corporate strategy descriptive image" className=" h-full rounded-xl shadowed" />
                <Image loading="lazy" src={Sulfur.src} width={500} height={500} alt="Our corporate strategy descriptive image" className=" h-full rounded-xl shadowed" />
                <Image loading="lazy" src={Tungsten.src} width={500} height={500} alt="Our corporate strategy descriptive image" className=" h-full rounded-xl shadowed" />
            </div>
        </WebSection>
    )
}