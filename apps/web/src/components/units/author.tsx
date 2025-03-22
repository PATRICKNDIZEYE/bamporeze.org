import { Text } from "@repo/ui/units"
import Image from "next/image"
import { FC } from "react"
import PlaceholderImage from "../../../assets/images/placeholder.webp"
import formatDate from "../../utils/formatDate"
export interface IAuthor {
    name: string,
    profile_image?: string,
    releaseDate: string
}

const Author: FC<IAuthor> = ({ name, profile_image, releaseDate }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center">
                <Image
                    src={profile_image ? profile_image : PlaceholderImage.src}
                    alt={name}
                    className="rounded-full w-6 h-6 object-cover"
                    width={40}
                    height={40}
                />
                <Text variant="paragraph" className="text-brand-blackblue">
                    {name}
                </Text>
            </div>
            <span className="font-black">•</span>
            <Text variant="paragraph">
                {formatDate(releaseDate)}
            </Text>
        </div>
    )
}


export default Author