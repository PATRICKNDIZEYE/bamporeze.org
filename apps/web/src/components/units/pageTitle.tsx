import { FC } from "react";
import WebSection from "../layouts/websection";
import SectionTitle from "./sectionTitle";

export interface IPageHeadProps {
    title: string;
    backgroundImage: string;
    subtitle: string,
    suptitle: string,
    padBottom?: boolean,
    withBg?: boolean
}

const PageHead: FC<IPageHeadProps> = ({ title, backgroundImage, subtitle, suptitle, padBottom, withBg }) => {
    return (
        <div className="relative">
            {/* Blurred background image */}
            <div 
                className="absolute inset-0 w-full h-full filter blur-[2px]"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: 'center',
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
            
            {/* Darker overlay */}
            <div className="absolute inset-0 bg-black opacity-70"></div>
            
            {/* Content */}
            <WebSection about="About us" animate={false} className={`py-10 flex items-center justify-center ${padBottom && 'pb-24'} relative z-10`}>
                <SectionTitle direction="vertical" title={title} border={false} suptitle={suptitle} subtitle={subtitle} />
            </WebSection>
        </div>
    )
}

export default PageHead;