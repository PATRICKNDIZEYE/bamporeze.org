'use client'
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button, Text } from "@repo/ui/units";
import Image from "next/image";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
export default function AdminProfile() {
    const { logout } = useAuth()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (e.target !== document.querySelector('#user-popover')) {
                setOpen(false)
            }
        })
    }, [])
    return (
        <div className="relative" id="user-popover">
            <div className="flex items-center gap-4 hover:bg-brand-darkblue-10 p-2 rounded-md cursor-pointer " >

                <div className="w-6 h-6">
                    <Image loading="lazy" src='https://res.cloudinary.com/dzuq9e15n/image/upload/v1707211031/user-profile-png.png' alt="Board of directors" className="rounded-full w-full h-full border border-brand-darkblue-10 object-cover" width={50} height={50} />
                </div>
                <div className="flex flex-col">
                    <Text variant="label" className="text-brand-blackblue font-bold">John Doe</Text>
                    <Text variant="paragraph" className="">johndoe@gmail.com</Text>
                </div>
                <button onMouseEnter={() => setOpen(true)}>
                    <ChevronDownIcon />
                </button>
            </div>
            {open && <div className="shadowed flex flex-col items-center gap-2 absolute top-[50px] w-full rounded-md border border-brand-darkblue-10s right-0 bg-white p-3">
                <Image src='https://res.cloudinary.com/dzuq9e15n/image/upload/v1707211031/user-profile-png.png' alt="Board of directors" className="rounded-full min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] border border-brand-darkblue-10 object-cover" width={50} height={50} loading="lazy" />
                <Text variant="label" className="text-brand-blackblue font-bold">John Doe</Text>
                <Text variant="paragraph" className="">johndoe@gmail.com</Text>
                <Button variant={'secondary'} className="w-full text-red-500 bg-red-50 hover:bg-red-500 hover:text-white" onClick={logout}>Logout</Button>
            </div>}
        </div>
    )
}