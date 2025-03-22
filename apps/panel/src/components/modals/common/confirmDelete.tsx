import { Button, Text } from "@repo/ui/units";
import { type FC } from "react";

interface IConfirmDeleteProps {
    onYes: () => void
    onCancel: () => void
}


const ConfirmDelete: FC<IConfirmDeleteProps> = ({ onYes, onCancel }: IConfirmDeleteProps) => {


    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Text variant={'heading3'} className="font-semibold text-lg text-red-500">Really want to delete ?</Text>
            </div>
            <div className="flex  flex-col items-center gap-3">
                <Text variant={'paragraph'}>Are you sure sure want to delete this. Note that this action is  not reversible.</Text>
            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'tertiary'} className="bg-brand-lightblue  rounded-md" onClick={onCancel}>Cancel</Button>
                <Button variant={'primary'} className="bg-red-400  rounded-md" onClick={onYes} >Yes, Delete</Button>

            </div>
        </div>
    );
}

export default ConfirmDelete