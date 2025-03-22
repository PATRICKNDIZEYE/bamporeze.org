'use client'

import { RecoilRoot } from "recoil";
import AsideNav from "../../components/navigation/aside";
import HeaderBar from "../../components/navigation/headerNav";
import { GlobalCtxProvider } from "../../hooks/useGlobalContext";
import { ModalCtxProvider } from "../../hooks/useModal";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <RecoilRoot>
            <ModalCtxProvider>
                <GlobalCtxProvider>
                    <div className="grid grid-cols-6  min-h-screen max-h-screen bg-[#F8FBFD] overflow-y-scroll">
                        <div className="col-span-1">
                            <AsideNav />
                        </div>
                        <div className="col-span-5">
                            <div className="sticky top-0  z-20 h-[10%]">
                                <HeaderBar />
                            </div>
                            <div className="p-8  h-[90%] ">
                                {children}
                            </div>
                        </div>
                    </div>
                </GlobalCtxProvider>
            </ModalCtxProvider>
        </RecoilRoot>
    )
}