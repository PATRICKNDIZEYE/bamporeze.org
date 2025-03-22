'use client'

import { Text } from "@repo/ui/units";
import { usePathname } from "next/navigation";
import { navLinks } from "../../constants/data";
import AdminProfile from "../adminProfile";



export default function HeaderBar() {
    const pathname = usePathname();
    const resolveCurrentPath = () => {
        const path = navLinks.find(navlink => (navlink.href != null && navlink.href == pathname) || (!navlink.href && navlink.subLinks && navlink.subLinks?.find(link => link.href == pathname)))
        return path
    }

    const currentPath = resolveCurrentPath()

    return (
        <div className="h-[70px] flex items-center justify-between px-8 border-b border-brand-darkblue-10 shadowed z-50 bg-white">
            <Text variant="heading3">{currentPath?.label || 'Admin panel'}</Text>
            <div className="flex  items-center gap-1">
                {/* <Button variant={'tertiary'} className="w-8 h-8">
                    <SearchIcon />
                </Button>
                <Button variant={'tertiary'} className="w-8 h-8">
                    <NotificationIcon />
                </Button> */}
                <AdminProfile />
            </div>
        </div>
    )
}