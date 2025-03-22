import { HomepageReviews, HomepageSliders, PartnerCompanies } from "./sections";

export default function Homepage() {
    return (
        <div className="flex flex-col gap-10">
            <HomepageSliders />
            <HomepageReviews />
            <PartnerCompanies />
        </div>
    )
}