import { Text } from "@repo/ui/units";
import Image from "next/image";
import WebSection from "../../components/layouts/websection";
import { WithLocaleProp } from "../../components/units/navbar";
import { getBoardMembers } from "../../utils/api";
import { getDictionary } from "../../utils/dictionary";

// Define the classification enum directly since it's missing from the imports
enum BoardClassification {
    BOARD_MEMBER = "BOARD_MEMBER",
    MANAGER = "MANAGER"
}

export default async function BoardOfDirectors({ locale }: WithLocaleProp) {
    const boardMembersResponse = await getBoardMembers();
    const dictionary = getDictionary(locale);

    // Add this debug component to see what data we're getting
    if (!boardMembersResponse || !boardMembersResponse.data) {
        console.error("No board members found or invalid response format", boardMembersResponse);
        return null;
    }

    // Use the data property from the response
    const boardMembers = boardMembersResponse.data;

    // Filter board members by classification
    const directors = boardMembers.filter(
        member => member.classification === BoardClassification.BOARD_MEMBER
    );
    
    const managers = boardMembers.filter(
        member => member.classification === BoardClassification.MANAGER
    );

    return (
        <WebSection about="Board of directors" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        {dictionary.pages?.about?.board?.title || "Our Leadership"}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Get to know key officials running the company
                    </p>
                    <div className="w-24 h-0.5 bg-blue-500 mx-auto mt-6"></div>
                </div>
                
                {/* Board of Directors Section */}
                {directors.length > 0 && (
                    <div className="mb-20">
                        <h3 className="text-2xl font-semibold mb-8 border-l-4 border-blue-600 pl-3">
                            Board of Directors
                        </h3>
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
                            {directors.map((director, index) => (
                                <div 
                                    key={director.id || index} 
                                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="h-72 overflow-hidden">
                                        <Image 
                                            src={director.profile_picture} 
                                            alt={director.full_name || `Board Member ${index + 1}`} 
                                            width={400} 
                                            height={500} 
                                            className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105" 
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-xl font-bold mb-1">{director.full_name}</h4>
                                        <p className="text-blue-600 text-sm mb-3">{director.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Management Team Section */}
                {managers.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-semibold mb-8 border-l-4 border-blue-600 pl-3">
                            Management Team
                        </h3>
                        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
                            {managers.map((manager, index) => (
                                <div 
                                    key={manager.id || index} 
                                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="h-72 overflow-hidden">
                                        <Image 
                                            src={manager.profile_picture} 
                                            alt={manager.full_name || `Manager ${index + 1}`} 
                                            width={400} 
                                            height={500}
                                            className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105" 
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-xl font-bold mb-1">{manager.full_name}</h4>
                                        <p className="text-blue-600 text-sm mb-3">{manager.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </WebSection>
    );
}