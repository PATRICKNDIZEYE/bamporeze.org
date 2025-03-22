'use client'
import { IJobPosition, IPartnerCompany, IReview, ISlide, IWriting } from '@repo/ui/types';
import React, { useEffect } from 'react';
import { INewsLetterSubscriber } from "../app/p/newsletter_subscribers/page";

export interface IGlobalContext {

    newsletterSubs: INewsLetterSubscriber[],
    setNewsletterSubs: (data: INewsLetterSubscriber[]) => void,

    newsletterReleases: IWriting[],
    setNewsletterReleases: (data: IWriting[]) => void,

    blogs: IWriting[],
    setBlogs: (data: IWriting[]) => void,

    jobs: IJobPosition[],
    setJobs: (data: IJobPosition[]) => void,

    homepageSliders: ISlide[],
    setHomepageSliders: (data: ISlide[]) => void,

    homepageReviews: IReview[],
    setHomepageReviews: (data: IReview[]) => void

    homepagePartners: IPartnerCompany[],
    setHomepagePartners: (data: IPartnerCompany[]) => void

}


export const GlobalCtx = React.createContext<IGlobalContext>({

    newsletterSubs: [],
    setNewsletterSubs: () => { },

    newsletterReleases: [],
    setNewsletterReleases: () => { },

    blogs: [],
    setBlogs: () => { },

    jobs: [],
    setJobs: () => { },

    homepageSliders: [],
    setHomepageSliders: () => { },

    homepageReviews: [],
    setHomepageReviews: () => { },

    homepagePartners: [],
    setHomepagePartners: () => { }
})


export function GlobalCtxProvider({ children }: any) {
    const [newsletterSubs, setNewsletterSubs] = React.useState<INewsLetterSubscriber[]>([])
    const [newsletterReleases, setNewsletterReleases] = React.useState<IWriting[]>([])
    const [blogs, setBlogs] = React.useState<IWriting[]>([])
    const [jobs, setJobs] = React.useState<IJobPosition[]>([])
    const [homepageSliders, setHomepageSliders] = React.useState<ISlide[]>([])
    const [homepageReviews, setHomepageReviews] = React.useState<IReview[]>([])
    const [homepagePartners, setHomepagePartners] = React.useState<IPartnerCompany[]>([])


    
    return (
        <GlobalCtx.Provider value={{
            newsletterReleases,
            setNewsletterReleases,
            newsletterSubs,
            setNewsletterSubs,
            blogs,
            setBlogs,
            jobs,
            setJobs,
            homepageSliders,
            setHomepageSliders,
            homepageReviews,
            setHomepageReviews,
            homepagePartners,
            setHomepagePartners
        }}>
            {children}
        </GlobalCtx.Provider>
    )
}


export default function useGlobalCtx() { return React.useContext(GlobalCtx) }