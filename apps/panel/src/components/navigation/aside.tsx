'use client'
import { Button, Logo, Text } from "@repo/ui/units";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { INavLink, navLinks } from "../../constants/data";
import useModal from "../../hooks/useModal";
import DevContact from "../devContact";

function NavbarLink({ label, href, Icon, subLinks }: INavLink) {
    const pathname = usePathname();
    const router = useRouter()
    const isActive = pathname.includes(`${href}`);
    const [isExpanded, setIsExpanded] = useState(pathname.includes('/p/website'));

    const handleClick = () => {
        if (href) {
            router.push(href)
        } else {
            setIsExpanded(true)
        }
    }

    return (
        <div className="cursor-pointer hover:bg-blue-to-transparent">
            <div className={`px-8 py-3  flex items-center justify-between border-l-4 ${isActive ? 'border-brand-darkblue bg-blue-to-transparent' : 'border-transparent'}`}>
                <div className="flex items-center gap-4 fill-white" onClick={handleClick} >
                    <Icon />
                    <Text className="text-brand-white"> {label} </Text>
                </div>
                {!subLinks && <div className={`w-[5px] h-[20px] ${isActive ? 'bg-brand-darkblue' : 'bg-transparent'} rounded-md`} />}
                {subLinks && <button onClick={() => setIsExpanded(!isExpanded)}>
                    <svg className={`w-6 h-6 fill-white rounded-[1px] transition-all ${isExpanded && 'rotate-180'}`} viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z" />
                    </svg>
                </button>}
            </div>
            {
                subLinks && isExpanded && <div className="pl-8">
                    {
                        subLinks.map((link, i) => (
                            <NavbarLink key={i} {...link} />
                        ))
                    }
                </div>
            }
        </div>
    )
}
export default function AsideNav() {
    const { setModal } = useModal()
    return (
        <div className="bg-brand-blackblue flex flex-col justify-between  text-white min-h-[100vh] max-h-[100vh]  sticky top-0 w-full">
            <div className="h-[10vh] flex items-center px-8">
                <Logo variant="dark" />
            </div>
            <div className="h-[60vh]  overflow-y-scroll no-scrollbar">
                {
                    navLinks.map((link, i) => (
                        <NavbarLink key={i} {...link} />
                    ))
                }
            </div>
            <div className="p-8 h-[30vh] bg-brand-blackblue">
                <div className="flex flex-col gap-3">
                    <Text variant={"heading4"} className="text-white">Any problem?</Text>
                    <Text variant={"paragraph"} className="text-brand-white-80 ">If something is behaving unexpectedly, please contact the developer.</Text>
                    <Button variant="tertiary" className="bg-brand-white-10 hover:bg-brand-white/20 flex items-center justify-center" onClick={() => setModal(<DevContact />)}>
                        <Text className="text-white hover:text-brand-blackblue">Support</Text>
                    </Button>
                </div>
            </div>
        </div>
    )
}