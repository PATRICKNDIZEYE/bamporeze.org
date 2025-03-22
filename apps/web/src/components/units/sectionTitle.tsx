import { Text } from "@repo/ui/units"
import { FC } from "react"

interface ISectionTitleProps {
    direction: 'vertical' | 'horizontal',
    title: string,
    suptitle?: string,
    subtitle?: string,
    border?: boolean
}





const SectionTitle: FC<ISectionTitleProps> = ({ direction, title, suptitle, subtitle, border }) => {
    return (
        <div className={`text-white  flex flex-col ${direction == 'horizontal' ? "pl-10 border-l-4 border-brand-darkblue w-fit max-w-1/2" : "pb-10 text-center flex flex-col items-center mx-auto border-b-4 w-fit border-brand-darkblue"} ${(border != undefined && border == false) && "border-none"} `}>
            {suptitle && <Text variant={"suptitle"} >
                {suptitle}
            </Text>}
            <Text variant={"title_2"}>
                {title}
            </Text>
            {subtitle && <Text variant={"subtitle"}>
                {subtitle}
            </Text>}
        </div>
    )
}

export default SectionTitle