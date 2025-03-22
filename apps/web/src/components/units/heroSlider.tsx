'use client'
import { Button, Text } from "@repo/ui/units";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Locale } from "../../../i18n.config";
import { getDictionary } from "../../utils/dictionary";
import { useState } from "react";

export default function HeroSlider({ slides, locale }: { slides: any, locale: Locale }) {
    const dictionary = getDictionary(locale);
    const slidesArray = slides?.data || [];
    const [activeSlide, setActiveSlide] = useState(0);
    
    if (!slidesArray || slidesArray.length === 0) {
        return null;
    }

    const settings = {
        dots: false, // We'll create custom dots
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        beforeChange: (_: any, next: number) => setActiveSlide(next),
    };

    return (
        <div className="relative w-full">
            <Slider {...settings} className="w-full">
                {slidesArray.map((slide, i) => (
                    <div key={slide.id || i} className="relative h-[85vh]">
                        {/* Background image with absolute positioning */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            <Image 
                                src={slide.background_image}
                                alt={slide.title}
                                layout="fill"
                                objectFit="cover"
                                priority={i === 0}
                                quality={90}
                            />
                        </div>
                        
                        {/* Blue overlay exactly matching the reference */}
                        <div className="absolute inset-0 bg-[#153987] opacity-80 z-10"></div>
                        
                        {/* Content */}
                        <div className="relative z-20 h-full flex items-center">
                            <div className="container mx-auto px-6 lg:px-8">
                                <div className="max-w-3xl">
                                    <p className="text-[#91c1fc] font-medium mb-3">
                                        HCA International
                                    </p>
                                    
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white">
                                        {slide.title}
                                    </h1>
                                    
                                    <p className="text-lg lg:text-xl mb-8 text-white opacity-95">
                                        {slide.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-4">
                                        <Link href="/contact">
                                            <button className="bg-[#1978E8] hover:bg-[#1569d1] text-white py-3 px-6 rounded-md transition-all">
                                                Contact us
                                            </button>
                                        </Link>
                                        
                                        <Link href="/programs">
                                            <button className="border border-white text-white py-3 px-6 rounded-md flex items-center hover:bg-white/10 transition-all">
                                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2-7V9l6 3-6 3z"/>
                                                </svg>
                                                Explore our Programs
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            
            {/* Custom pagination indicators matching the reference image */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
                <div className="flex space-x-4">
                    {slidesArray.map((_, index) => {
                        const isActive = index === activeSlide;
                        return (
                            <button 
                                key={index} 
                                onClick={() => {
                                    const slider = document.querySelector('.slick-slider') as any;
                                    if (slider && slider.slickGoTo) {
                                        slider.slickGoTo(index);
                                    }
                                }}
                                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-white' 
                                        : 'bg-white bg-opacity-50 hover:bg-opacity-70'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}