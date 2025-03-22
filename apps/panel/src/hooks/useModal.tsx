'use client'
import React, { FC, createContext, useEffect, useState } from "react"

export interface IModalCtx {
    modal: React.JSX.Element | null,
    setModal: (modal: React.JSX.Element | null) => void

}

export const ModalContext = createContext<IModalCtx>({
    modal: null,
    setModal: () => { },

})


export const ModalCtxProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modal, setModal] = useState<React.JSX.Element | null>(null)

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (e.target === document.querySelector('#modal-container')) {
                setModal(null)
            }
        })
    }, [])

    useEffect(() => {
        if (modal) document.documentElement.classList.add("overflow-hidden")
        if (!modal) document.documentElement.classList.remove("overflow-hidden")
    }, [modal])
    return (
        <ModalContext.Provider value={{ modal, setModal }}>
            {children}
            {modal && <div className="absolute  z-50  h-screen   bg-black/60 backdrop-blur-sm flex items-center top-0 left-0 bottom-0 right-0 justify-center" id="modal-container" style={{
                overflow: modal ? 'hidden' : 'auto'
            }}>
                <div className="shadowed">
                    <modal.type  {...modal.props} key={modal.key} />
                </div>
            </div>}
        </ModalContext.Provider>
    )
}

export default function useModal() { return React.useContext(ModalContext) }