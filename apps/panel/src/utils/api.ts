import { cache } from "react"
import 'server-only'
import { fetcher } from './axios.config'


export type url = `http${'s' | ''}://${string}`



interface Author {
    name: string
    email: string
    id: string
    profile_picture: string
}
export interface IWriting {
    id: string,
    thumbnail_image: url,
    title: string,
    description: string,
    authorId?: string,
    author: Author,
    content: string
    writingType: 'BLOG' | 'WRITING',
    isReleased: boolean,
    releaseDate: string
}


export const getBlogHighlight = cache(async () => {
    const highlight = await fetcher('/writing/blogs/random')
    return highlight['data'] as IWriting
})


export async function getBlogs(): Promise<IWriting[]> {
    const res = await fetcher('/writing/blogs')
    return res.data as IWriting[]
}


export async function getBlog(id: string) {
    const res = await fetcher(`/writing/${id}`)
    return res.data as IWriting

}



export async function getPressReleases(): Promise<IWriting[]> {
    const res = await fetcher('/writing/newsletter')
    return res.data as IWriting[]
}
export interface IReview {
    id: string
    reviewer_company: string,
    review_message: string,
    reviewer_name: string,
    reviewer_image: url
}

export async function getReviews(): Promise<IReview[]> {
    const res = await fetcher('/reviews')
    return res.data as IReview[]
}


export interface IPartnerCompany {
    company_name: string,
    company_logo: url,
    company_website: url
}

export const getPartnerCompanies = cache(async () => {
    const companies = await fetcher('/partner-companies')
    return companies.data as IPartnerCompany[]
})


export interface ISlide {
    title: string,
    background_image: string
    description: string
    id: string
}

export const getSlides = cache(async (): Promise<ISlide[]> => {
    const slides = await fetcher('/homepage-sliders')
    return slides['data'] as ISlide[]
})





export type BoardMemberClassification = 'BOARD_MEMBER' | 'MANAGER'
export interface IBoardMember {
    id: string
    full_name: string
    role: string
    classification: BoardMemberClassification
    profile_picture: url
}

export const getBoardMembers = cache(async (classification?: BoardMemberClassification): Promise<IBoardMember[]> => {
    const members = await fetcher(`/officials/${classification ? `?classification=${classification}` : ``}`)
    return members.data as IBoardMember[]
})

export interface IService {
    id: string
    title: string
    description: string
    descriptive_image: url
}



export const getServices = cache(async (): Promise<IService[]> => {
    const services = await fetcher('/services')
    return services.data as IService[]
})

export interface IJobPosition {
    id: string
    title: string
    type: string
    location: string
    isOpen: boolean
    description: string
}


export const getJobPositions = cache(async (): Promise<IJobPosition[]> => {
    const jobs = await fetcher('/jobs?type=open')
    return jobs.data as IJobPosition[]
})

export const getSingleJob = cache(async (id: string): Promise<IJobPosition> => {
    const job = await fetcher(`/jobs/${id}`)
    return job.data as IJobPosition
})


