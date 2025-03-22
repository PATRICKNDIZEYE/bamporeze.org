'use client'
import type { FC, HTMLAttributes } from "react";
import { Slide } from 'react-swift-reveal';
interface WebSectionProps extends HTMLAttributes<HTMLDivElement> {
    about: string,
    animate?: boolean
}

const WebSection: FC<WebSectionProps> = ({ children, about, className, animate = true, style, ...props }: WebSectionProps) => {
    return (
        <>
            {animate ? <Slide bottom={animate} distance="2%" duration={1000} timeout={2000}>
                <section className={"md:px-[10vw] msm:px-2 " + className} {...props} about={about} style={style}>
                    {children}
                </section>
            </Slide> :
                <section className={"md:px-[10vw] msm:px-2 " + className} {...props} about={about} style={style}>
                    {children}
                </section>
            }
        </>
    )
}

export default WebSection