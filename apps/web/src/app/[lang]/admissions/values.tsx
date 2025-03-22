import { Locale } from "../../../../i18n.config";
import WebSection from "../../../components/layouts/websection";
import GrainBgTitle from "../../../components/units/grainBgTitle";
import { getDictionary } from "../../../utils/dictionary";

export default function Values({ lang }: { lang: Locale }) {
    const dictionary = getDictionary(lang);
    
    // Provide fallback values or check for the existence of properties
    const title = dictionary.pages?.admissions?.values?.title || 
                 dictionary.pages?.about?.values?.title || 
                 "Our Core Values";
                 
    const values = dictionary.pages?.admissions?.values?.values || 
                  dictionary.pages?.about?.values?.values || 
                  ["Integrity", "Excellence", "Innovation", "Teamwork", "Leadership"];
    
    return (
        <WebSection about="Corporate Objectives" className="flex flex-col items-center w-full py-14">
            <GrainBgTitle title={title} />
            <div className='grid lg:grid-cols-3 w-full msm:grid-cols-2 gap-4'>
                {
                    (Array.isArray(values) ? values : Object.values(values || {})).map((v, i) => (
                        <div key={i} className="flex flex-col items-center shadow-md shadow-slate-100 bg-white text-center p-6 gap-4 rounded-lg border border-slate-100 w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="w-10 h-10 opacity-30 stroke-brand-darkblue" viewBox="0 0 14 14">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4.03 4.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4" />
                                    <path d="M5.716 10.524L5.344 13.5H2.727l-.5-4H.529V8a3.5 3.5 0 0 1 6.942-.634M7.295 9.97c0-.487.395-.882.882-.882h4.412c.487 0 .882.395.882.883v2.647a.882.882 0 0 1-.882.882H8.177a.882.882 0 0 1-.882-.882zm1.881-.882v-.65a1 1 0 0 1 1-1h.412a1 1 0 0 1 1 1v.65" />
                                </g>
                            </svg>
                            <p className="">{v as string}</p>
                        </div>
                    ))
                }
            </div>
        </WebSection>
    )
}