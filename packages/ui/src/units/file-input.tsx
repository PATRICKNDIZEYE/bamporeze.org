'use client'
import { useId, useState } from "react";
import { Text } from ".";

interface IFileInputProps {
    value: string | null,
    setValue: (value: string | null) => void;
    label?: string
}

export function FileInput({ value, setValue, label }: IFileInputProps) {
    const [loading, setLoading] = useState(false)
    const fileInputId = useId()

    const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files![0]
        if (file) {
            const form = new FormData()
            form.append("file", file)
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/files/upload`, {
                method: "POST",
                body: form,
                headers: {
                    // 'Content-Type': 'multipart/form-data'
                }
            }).then(res => res.json()).then(data => {
                setValue(data['data'])
            }).catch((err) => {
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const handleRemove = () => {
        if (value) {
            setLoading(true)
            fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/files/delete/`, {
                body: JSON.stringify({
                    url: value
                }),
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                setValue(null)
            }).catch((err) => {
            }).finally(() => {
                setLoading(false)
            })
        }
    }


    return (
        <div className="relative  flex flex-col gap-2">
            {label && label.trim() != "" && <Text variant={'label'}>{label}</Text>}
            <div className="ui-w-full flex items-center ui-justify-between ui-border ui-border-[#F0F4FD] placeholder:ui-text-brand-lightblack/40 placeholder:ui-text-sm ui-h-[50px] ui-rounded-md ui-px-5   ui-outline-none ui-resize-none focus:ui-ring-brand-darkblue/50 focus:ui-ring-2 ui-duration-100">
                <Text variant="label" > {loading ? "Processing..." : value ? value.split('/').pop() : "Choose a file"} </Text>
                {!value ?
                    <label htmlFor={fileInputId} className="cursor-pointer ml-auto">
                        <input type="file" className="ui-hidden" id={fileInputId} onChange={handleLoad} />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ui-w-5  ui-h-5">
                            <path d="M17 9.00195C19.175 9.01395 20.353 9.11095 21.121 9.87895C22 10.758 22 12.172 22 15V16C22 18.829 22 20.243 21.121 21.122C20.243 22 18.828 22 16 22H8C5.172 22 3.757 22 2.879 21.122C2 20.242 2 18.829 2 16V15C2 12.172 2 10.758 2.879 9.87895C3.647 9.11095 4.825 9.01395 7 9.00195" stroke="#51697F" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M12 15V2M12 2L15 5.5M12 2L9 5.5" stroke="#51697F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </label>
                    :
                    <button onClick={handleRemove}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                }
            </div>
        </div>
    )
}