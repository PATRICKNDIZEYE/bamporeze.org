import { Text } from "@repo/ui/units";
import WebSection from "../../components/layouts/websection";
import { WithLocaleProp } from "../../components/units/navbar";
import Image from "next/image";
import { getCompanies } from "../../utils/api";
import { getDictionary } from "../../utils/dictionary";

export default async function TrustedCompanies({ locale }: WithLocaleProp) {
    const dictionary = getDictionary(locale);
    const companiesResponse = await getCompanies();
    
    // If no companies, don't render the section
    if (!companiesResponse || !companiesResponse.data || companiesResponse.data.length === 0) {
        return null;
    }

    const companies = companiesResponse.data;

    return (
        <WebSection className="bg-white py-16" about="Our trusted partners">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    {/* Left side with title and subtitle */}
                    <div className="flex mb-8 md:mb-0 md:w-1/3">
                        <div className="w-1 bg-blue-600 h-full mr-4 self-stretch"></div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3">Trusted by great companies</h2>
                            <p className="text-gray-600 text-sm">
                                Our company has partnered and authorized to work with various great companies
                            </p>
                        </div>
                    </div>
                    
                    {/* Right side with logos */}
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-8 md:w-2/3 justify-end">
                        {companies.map((company, index) => {
                            const logoUrl = company.company_logo || company.logo || '';
                            const companyName = company.company_name || company.name || `Partner ${index + 1}`;
                            
                            if (!logoUrl) return null;
                            
                            return (
                                <div key={company.id || index} className="transition-all">
                                    <Image
                                        src={logoUrl}
                                        alt={companyName}
                                        width={120}
                                        height={60}
                                        className="object-contain h-16"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </WebSection>
    );
}