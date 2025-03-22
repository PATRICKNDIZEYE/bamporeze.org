import WebSection from "../../components/layouts/websection";
import { WithLocaleProp } from "../../components/units/navbar";
import Image from "next/image";
import { getPartnerCompanies } from "../../utils/api";
import { getDictionary } from "../../utils/dictionary";

export default async function OurHappyClients({ locale }: WithLocaleProp) {
    const partners = await getPartnerCompanies();
    const dictionary = getDictionary(locale);
    
    // Skip rendering if no partners
    if (!partners || partners.length === 0) {
        return null;
    }
    
    // Get just the data array if it's nested
    const partnersArray = partners.data || partners;
    
    // Text to match the exact design shown in the image
    const translations = {
        suptitle: "PARTNERS",
        title: "OUR PARTNERS",
        subtitle: "Hear the thankful feedback that we get from our current customers"
    };

    return (
        <WebSection className="bg-white py-16" about="Our partners">
            <div className="container mx-auto px-4 text-center">
                {/* Section header with blue underline */}
                <div className="mb-12">
                    <h3 className="uppercase text-blue-500 text-sm font-medium mb-2">
                        {translations.suptitle}
                    </h3>
                    <h2 className="text-3xl font-bold mb-3">
                        {translations.title}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        {translations.subtitle}
                    </p>
                    <div className="w-32 h-0.5 bg-blue-500 mx-auto"></div>
                </div>
                
                {/* Partners showcase */}
                <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                    {partnersArray.map((partner, index) => {
                        const logoUrl = partner.company_logo || '';
                        const name = partner.company_name || `Partner ${index + 1}`;
                        
                        if (!logoUrl) return null;
                        
                        return (
                            <div key={partner.id || index} className="flex items-center justify-center">
                                <Image
                                    src={logoUrl}
                                    alt={name}
                                    width={150}
                                    height={80}
                                    className="object-contain h-16"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </WebSection>
    );
}