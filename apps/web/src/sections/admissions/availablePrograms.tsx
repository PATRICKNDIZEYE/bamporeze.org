import { Button, Text } from "@repo/ui/units";
import WebSection from "../../components/layouts/websection";
import { WithLocaleProp } from "../../components/units/navbar";

interface ICourse {
    title: string;
    description: string;
}

const courses: ICourse[] = [
    {
        title: "Learning How To Learn",
        description: "How many subjects have you studied but remember nothing about? This course offers methods for recognizing and resolving all difficulty in absorbing material, including a previously unacknowledged barrier that ultimately lies at the root of all failures to pursue a given subject. When you finish this course, you will be able to confidently learn and apply any subject."
    },
    {
        title: "How To Use Dictionary",
        description: "Do you know that inappropriate use of a dictionary can block you from achieving career success? This course will teach you to use a dictionary effectively, unlocking the secrets of words, making studying enjoyable, and empowering you to excel in any field."
    },
    {
        title: "Grammar and Communication",
        description: "In today's workplace, it's not uncommon for staff to be called upon to explain verbally the meaning of their emails, highlighting the need for clear communication. With this course, you'll improve your ability to understand and communicate effectively, reaching levels of proficiency that you haven't imagined before. You'll be equipped with the skills to communicate with confidence in both written and verbal forms."
    },
    {
        title: "BASIC STUDY MANUAL",
        description: "Have you ever studied a subject but struggled to apply it at work? Have you abandoned books midway or avoided challenging topics? The Basic Study Manual (BSM) is your key to overcoming these hurdles. Future success depends on your ability to quickly learn and master new information about your role and emerging technologies. BSM teaches the three barriers to study and how to handle them, enabling you to effectively grasp and apply knowledge in any area you choose."
    },
    {
        title: "SUCCESS THROUGH COMMUNICATION",
        description: "Have you ever found it difficult to maintain focus or experienced your mind drifting away from the topic at hand? This course will help you overcome these challenges and master the essential components of effective communication through 15 practical drills. By the end of the course, you will confidently express yourself without barriers. Studying will become a rewarding and enjoyable experience."
    }
];

export default function AvailablePrograms({ locale }: WithLocaleProp) {
    return (
        <WebSection about="Available courses" className="py-16">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Text variant="title_2">Available Courses</Text>
                    <Text variant="paragraph">
                        We'd love to see you in our team, apply to where you fit by sending us your resume on courses@hca.org.rw
                    </Text>
                </div>

                <div className="flex flex-col gap-4">
                    {courses.map((course, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg border border-brand-darkblue-10">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex flex-col gap-3">
                                    <Text variant="heading3">{course.title}</Text>
                                    <Text variant="paragraph">{course.description}</Text>
                                </div>
                                <Button variant="secondary">Enroll</Button>
                            </div>
                        </div>
                    ))}
                </div>

                <Button variant="tertiary" className="w-fit">
                    <div className="flex items-center gap-2">
                        List more
                    </div>
                </Button>
            </div>
        </WebSection>
    );
} 