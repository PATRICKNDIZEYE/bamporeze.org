import { Text } from "@repo/ui/units";
import Link from "next/link";
import React from "react";
import WebSection from "../../components/layouts/websection";
import SectionTitle from "../../components/units/sectionTitle";
import Tag from "../../components/units/tag";
import { WithLocaleProp } from "../../components/units/navbar";
import { IJob } from "../../types";
import { getJobPositions } from "../../utils/api";
import { getDictionary } from "../../utils/dictionary";

export default async function AvailablePrograms({ locale }: WithLocaleProp) {
    const dictionaryText = getDictionary(locale);
    const jobsResponse = await getJobPositions();
    
    // Ensure we have an array of jobs
    const programs = Array.isArray(jobsResponse) 
        ? jobsResponse 
        : [];

    // Function to translate job types to program formats
    const getProgramFormat = (type?: string) => {
        if (!type) return "Full-time";
        
        const formatMap: {[key: string]: string} = {
            "FULL_TIME": "Full-time",
            "PART_TIME": "Part-time",
            "CONTRACT": "Certificate",
            "FREELANCE": "Flexible",
            "INTERNSHIP": "Internship"
        };
        
        return formatMap[type] || type.replace(/_/g, " ");
    };
    
    // Educational descriptions for each program type
    const getEducationalDescription = (type?: string, description?: string) => {
        if (description && description.length > 20) return description;
        
        const defaultDescriptions: {[key: string]: string} = {
            "FULL_TIME": "Do you know that mastering this program can open career opportunities? This course will teach you essential skills, unlocking the secrets of success, making learning enjoyable, and empowering you to excel in your field.",
            "PART_TIME": "Balance your existing commitments while gaining valuable skills. This flexible program is designed for working professionals looking to advance their careers without disrupting their schedule.",
            "CONTRACT": "Earn a recognized certificate that validates your expertise. This focused program delivers specialized knowledge employers are actively seeking in today's competitive market.",
            "FREELANCE": "Learn at your own pace with our self-guided curriculum. Develop practical skills that can be immediately applied to real-world situations and professional challenges.",
            "INTERNSHIP": "Gain hands-on experience while learning from industry experts. This program combines theoretical knowledge with practical application to prepare you for real workplace scenarios."
        };
        
        return defaultDescriptions[type || "FULL_TIME"] || defaultDescriptions["FULL_TIME"];
    };
    
    return (
        <WebSection about="Programs" className="py-16 mt-16 bg-white">
            <div>
                <SectionTitle 
                    title={dictionaryText.pages.careers.open_positions.title}
                    subtitle={dictionaryText.pages.careers.open_positions.subtitle}
                />
                
                <div className="flex flex-col gap-4 mt-10">
                    {programs.map((program: IJob) => (
                        <div key={program.id} className="bg-gray-50 p-8 rounded-lg hover:bg-gray-100 transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                <div className="flex-grow mb-4 md:mb-0 md:mr-8">
                                    <div className="flex mb-2">
                                        <Tag text={getProgramFormat(program.type)} />
                                        {program.isOpen && (
                                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                Enrolling Now
                                            </span>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-2">
                                        {program.title}
                                    </h3>
                                    
                                    <p className="text-gray-700 mb-4">
                                        {getEducationalDescription(program.type, program.short_description)}
                                    </p>
                                    
                                    <div className="flex items-center text-sm text-gray-500 flex-wrap gap-4">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            {program.location || "On Campus Learning"}
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Duration: {program.duration || "12 weeks"}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex-shrink-0 self-start">
                                    <Link href={`/admissions/${program.id}`}>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors">
                                            Enroll
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {programs.length === 0 && (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <Text variant="subtitle">No courses are currently open for enrollment. Please check back later for new educational opportunities.</Text>
                    </div>
                )}
            </div>
        </WebSection>
    );
}