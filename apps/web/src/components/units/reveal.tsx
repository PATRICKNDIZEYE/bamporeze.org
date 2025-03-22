'use client'
import { useEffect, useId, useRef, useState } from "react";

const RevealOnScroll = ({ children }: any) => {
    const ref = useRef(null);
    const id = useId()
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // setClassName('show')

                }
            })
        })

        const elt = document.getElementById(id)
        observer.observe(elt as Element)
    }, []);

    return (
        <div id={id} ref={ref}>
            {children}
        </div>
    );
};


export default RevealOnScroll


