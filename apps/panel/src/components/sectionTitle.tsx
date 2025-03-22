'use client'
import { Text } from "@repo/ui/units";

interface ISectionTitleProps {
    title: string;
    description?: string;
}

export default function SectionTitle({ title, description }: ISectionTitleProps) {
    return (
        <div className="flex flex-col gap-1">
            <Text variant={'heading3'} className="font-semibold text-lg">{title}</Text>
            {description && <Text variant={'paragraph'}>{description}</Text>}
        </div>
    )
}
