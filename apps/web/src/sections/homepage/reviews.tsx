import WebSection from "../../components/layouts/websection";
import { WithLocaleProp } from "../../components/units/navbar";
import Review from "../../components/units/review";
import SectionTitle from "../../components/units/sectionTitle";
import { getReviews } from "../../utils/api";
import { getDictionary } from "../../utils/dictionary";

export default async function Reviews({ locale }: WithLocaleProp) {
    const reviewsResponse = await getReviews();
    // Ensure we have an array, even if the response is not what we expect
    const reviews = Array.isArray(reviewsResponse?.data) 
        ? reviewsResponse.data 
        : Array.isArray(reviewsResponse) 
            ? reviewsResponse 
            : [];
            
    const dictionary = getDictionary(locale);

    return (
        <>
            {reviews && reviews.length > 0 && (
                <WebSection about="Our customer's reviews" className="bg-white flex flex-col py-16 gap-10 my-10 ">
                    <SectionTitle
                        direction="vertical"
                        title={dictionary.pages.home.reviews.title}
                        subtitle={dictionary.pages.home.reviews.subtitle}
                        suptitle={dictionary.pages.home.reviews.suptitle} />
                    <div className="grid md:grid-cols-3 msm:grid-cols-1 gap-4">
                        {reviews.map((review, index) => (
                            <Review key={index} {...review} />
                        ))}
                    </div>
                </WebSection>
            )}
        </>
    );
}