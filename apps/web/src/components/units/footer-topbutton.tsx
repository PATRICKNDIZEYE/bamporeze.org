'use client'


export default function FooterTopButton() {
    const handleBackToTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <button onClick={handleBackToTop}>
            <svg width="64" height="64" viewBox="0 0 64 64" className="w-[40px] h-[40px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="32" cy="32" rx="32" ry="32" transform="rotate(90 32 32)" fill="#0081FE" />
                <path d="M31.9999 23.3848L31.9999 43.0771" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M39.3846 30.7692L32.5041 22.3973C32.4411 22.3207 32.3637 22.2595 32.2768 22.2175C32.19 22.1755 32.0959 22.1538 32.0006 22.1538C31.9054 22.1538 31.8112 22.1755 31.7244 22.2175C31.6376 22.2595 31.5601 22.3207 31.4971 22.3973L24.6154 30.7692" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    )

}