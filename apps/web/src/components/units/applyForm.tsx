'use client'

import { Button, FileInput, Input, Text } from "@repo/ui/units";
import { useState } from "react";
import { Locale } from "../../../i18n.config";
import { axios } from "../../utils/axios.config";
import { getDictionary } from "../../utils/dictionary";

interface ApplyFormProps {
    jobId: string;
    locale: Locale;
}

export default function ApplyForm({ jobId, locale }: ApplyFormProps) {
    const dictionary = getDictionary(locale);
    const [applied, setApplied] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Individual state variables for each form field
    const [first_name, setFirstName] = useState<string>("");
    const [last_name, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone_number, setPhone] = useState<string>("");
    const [cover_letter, setCoverLetter] = useState<string>("");
    const [resume, setResume] = useState<string | null>(null);

    const handleSendApplication = async (e: any) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            
            // Send as JSON with all fields
            const res = await axios.post('/job-applications', {
                first_name,
                last_name,
                email,
                cover_letter,
                resume,
                jobId,
                phone_number
            });
            
            if (res.status == 201) {
                setApplied(true);
            }
        } catch (error) {
            console.error("Error submitting application:", error);
        } finally {
            setLoading(false);
        }
    };

    if (applied) {
        return (
            <div className="flex flex-col items-center justify-center text-center fade-in">
                <Text variant="heading4">{dictionary.pages.careers.apply_form.on_success.title}</Text>
                <Text variant="paragraph">{dictionary.pages.careers.apply_form.on_success.description}</Text>
            </div>
        );
    }

    return (
        <div>
            <Text variant="heading4">{dictionary.pages.careers.apply_form.title}</Text>
            <Text variant="paragraph">{dictionary.pages.careers.apply_form.subtitle}</Text>

            <div className="md:grid md:grid-cols-2 msm:flex msm:flex-col gap-2 my-4">
                <Input 
                    placeholder="John" 
                    label={dictionary.pages.careers.apply_form.f_name.label} 
                    _controller={{
                        value: first_name,
                        setValue: setFirstName,
                        initialValue: first_name
                    }} 
                    inputType="text" 
                />
                
                <Input 
                    placeholder="Doe" 
                    label={dictionary.pages.careers.apply_form.l_name.label} 
                    _controller={{
                        value: last_name,
                        setValue: setLastName,
                        initialValue: last_name
                    }} 
                    inputType="text" 
                />
                
                <Input 
                    placeholder="you@domain.com" 
                    label={dictionary.pages.careers.apply_form.email.label} 
                    _controller={{
                        value: email,
                        setValue: setEmail,
                        initialValue: email
                    }} 
                    inputType="text" 
                />
                
                <Input 
                    placeholder="+250 788 888 888" 
                    label={dictionary.pages.careers.apply_form.phone_number.label} 
                    _controller={{
                        value: phone_number,
                        setValue: setPhone,
                        initialValue: phone_number
                    }} 
                    inputType="text" 
                />
                
                <div className="col-span-2 flex flex-col gap-3">
                    <Input 
                        placeholder="Please describe your educational history, qualifications, and relevant coursework"
                        label="Educational Background" 
                        _controller={{
                            value: cover_letter,
                            setValue: setCoverLetter,
                            initialValue: cover_letter
                        }} 
                        inputType="textarea" 
                    />
                    
                    <FileInput 
                        value={resume} 
                        setValue={setResume} 
                        label="Academic Transcripts/CV" 
                    />
                </div>
                
                <Button 
                    variant="primary" 
                    onClick={handleSendApplication} 
                    loading={loading} 
                    className="md:w-fit msm:w-full my-4"
                >
                    Submit Application
                </Button>
            </div>
        </div>
    );
}