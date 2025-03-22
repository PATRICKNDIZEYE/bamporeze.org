import { Text } from "@repo/ui/units";
import WebSection from "../../components/layouts/websection";
import { WithLocaleProp } from "../../components/units/navbar";
import { getDictionary } from "../../utils/dictionary";

interface IApplicationProcessStep {
    title: string,
    description: string,
    icon: React.FC,
}

export default function ApplicationProcess({ locale }: WithLocaleProp) {
    const dictionary = getDictionary(locale)

    const applicationProcessSteps: IApplicationProcessStep[] = [
        {
            icon: () => <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="60" rx="6" fill="#0B60B0" />
                <path d="M31.72 38H28.94V26.88H26.38V24.48H31.72V38Z" fill="white" />
            </svg>,
            title: dictionary.pages.careers.application_process[1].title,
            description: dictionary.pages.careers.application_process[1].description,
        },
        {
            icon: () => <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="60" rx="6" fill="#0B60B0" />
                <path d="M34.4 35.52V38H24.96V36.42L29.06 32.22C30.62 30.62 31.28 29.78 31.28 28.6C31.28 27.5 30.54 26.76 29.36 26.76C28.06 26.76 27.26 27.58 27.26 28.9H24.56C24.56 26.2 26.6 24.28 29.5 24.28C32.2 24.28 34.18 25.98 34.18 28.26C34.18 29.9 33.58 30.94 31.22 33.32L29.18 35.52H34.4Z" fill="white" />
            </svg>,
            title: dictionary.pages.careers.application_process[2].title,
            description: dictionary.pages.careers.application_process[2].description,
        }, {
            icon: () => <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="60" rx="6" fill="#0B60B0" />
                <path d="M29.66 38.18C26.74 38.18 24.68 36.46 24.66 34.02H27.36C27.44 35.24 28.32 35.98 29.7 35.98C31.14 35.98 31.98 35.26 31.98 34.06C31.98 32.88 31 32.18 29.34 32.18H27.88V29.98H29.18C30.54 29.98 31.36 29.3 31.36 28.2C31.36 27.14 30.66 26.48 29.5 26.48C28.36 26.48 27.64 27.2 27.62 28.38H24.92C24.94 26.04 26.98 24.28 29.64 24.28C32.48 24.28 34.22 25.82 34.22 28C34.22 29.24 33.5 30.22 32.2 30.9C33.88 31.44 34.84 32.52 34.84 33.98C34.84 36.48 32.76 38.18 29.66 38.18Z" fill="white" />
            </svg>,
            title: dictionary.pages.careers.application_process[3].title,
            description: dictionary.pages.careers.application_process[3].description,
        }
    ]

    return (
        <WebSection about="Application process" className="py-16 bg-white my-16 text-white">
            <div className="bg-brand-blackblue md:p-10 msm:p-4 flex flex-col gap-10 rounded-lg">
                <div className={` flex flex-col pb-10 text-center flex flex-col items-center mx-auto border-b-2 w-fit border-brand-white-10 `}>
                    <Text variant={"suptitle"} className="text-brand-lightblack" >
                        {dictionary.pages.careers.application_process.suptitle}
                    </Text>
                    <Text variant={"title_2"} className="text-brand-white">
                        {dictionary.pages.careers.application_process.title}
                    </Text>
                    <Text variant={"subtitle"}>
                        {dictionary.pages.careers.application_process.subtitle}
                    </Text>
                </div>
                <div className="grid md:grid-cols-3 msm:grid-cols-1 gap-6">
                    {
                        applicationProcessSteps.map((step, index) => (
                            <div key={index} className="flex flex-col w-full p-10 bg-brand-white-10 gap-3 rounded-md">
                                <step.icon />
                                <Text variant="heading4" className="text-white"> {step.title}</Text>
                                <Text> {step.description}</Text>
                            </div>
                        ))
                    }
                </div>
            </div>
        </WebSection>
    )
}