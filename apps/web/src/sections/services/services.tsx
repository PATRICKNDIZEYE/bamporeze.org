import { Text } from "@repo/ui/units";
import Image from "next/image";
import WebSection from "../../components/layouts/websection";
import { getServices } from "../../utils/api";

export default async function ServicesSection() {
    const servicesResponse = await getServices();
    
    // Extract services array from the response
    const services = servicesResponse?.data || [];
    
    // Ensure we have an array to work with
    if (!Array.isArray(services)) {
        console.error("Invalid services data format:", servicesResponse);
        return (
            <WebSection about="Our services" className="py-16">
                <Text variant="heading2">No services available at the moment</Text>
            </WebSection>
        );
    }
    
    return (
        <WebSection about="Our services" className="py-16 flex flex-col gap-10">
            <div className="grid md:grid-cols-3 mdm:grid-cols-1 gap-4">
                {services.map((service, i) => (
                    <div 
                        key={service.id || i} 
                        className="p-5 rounded-lg flex flex-col gap-3 hooverable-card border border-brand-darkblue-10"
                    >
                        <Image 
                            src={service.descriptive_image} 
                            alt={service.title || "Service image"} 
                            className="rounded-md object-cover w-full h-[180px]" 
                            width={352} 
                            height={260} 
                        />
                        <div className="flex flex-col gap-3">
                            <Text variant="heading3" className="hv-text">
                                {service.title}
                            </Text>
                            <Text className="hv-subtext">
                                {service.description} 
                            </Text>
                        </div>
                    </div>
                ))}
            </div>
        </WebSection>
    );
}