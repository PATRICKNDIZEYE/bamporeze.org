'use client'
import Image from "next/image";
import Marquee from "react-fast-marquee";

// Add proper type definition to handle different API response formats
interface Company {
    id?: string;
    company_logo?: string;
    company_name?: string;
    logo?: string;
    name?: string;
    [key: string]: any; // Allow other properties
}

export default function PartnersMarquee({ companies }: { companies: any }) {
    // Ensure we're working with the array inside the API response
    const companiesArray = Array.isArray(companies) 
        ? companies 
        : companies?.data && Array.isArray(companies.data)
            ? companies.data
            : [];
    
    // Skip rendering if no companies
    if (!companiesArray || companiesArray.length === 0) {
        return null;
    }

    return (
        <Marquee pauseOnHover gradient={false} speed={50}>
            <div className="flex items-center gap-16 px-8">
                {companiesArray.map((company, index) => {
                    // Get logo URL (handle different property names)
                    const logoUrl = company.company_logo || company.logo || '';
                    const companyName = company.company_name || company.name || `Partner ${index + 1}`;
                    
                    // Skip if no logo URL
                    if (!logoUrl) {
                        return null;
                    }
                    
                    return (
                        <div key={company.id || index} className="grayscale hover:grayscale-0 transition-all cursor-pointer">
                            <Image
                                src={logoUrl}
                                alt={companyName}
                                width={120}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                    );
                })}
            </div>
        </Marquee>
    );
}