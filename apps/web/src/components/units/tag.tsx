import { Text } from "@repo/ui/units";

export default function Tag({ text }: { text: string }) {
    return (
        <div className=" bg-brand-darkblue-10 px-[8px] py-[4px] rounded-sm w-fit">
            <Text variant="paragraph" className="text-brand-darkblue w-fit"> {text} </Text>
        </div>
    )
}