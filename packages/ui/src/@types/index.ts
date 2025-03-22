export type url = `http${'s' | ''}://${string}`

export interface Author {
    name: string
    email: string
    id: string
    profile_picture: string
}

export interface ISeoKeyword {
    id: string,
    word: string
}
export interface IWriting {
    id: string,
    thumbnail_image: url,
    title: string,
    reads: number
    description: string,
    authorId?: string,
    author: Author,
    content: string
    writingType: 'BLOG' | 'WRITING',
    isReleased: boolean,
    releaseDate: string
}


export interface IPartnerCompany {
    id: string
    company_name: string,
    company_logo: url,
    company_website: url
}


export interface ISlide {
    title: string,
    background_image: string
    description: string
    id: string
}


export type BoardMemberClassification = 'BOARD_MEMBER' | 'MANAGER'
export interface IBoardMember {
    id: string
    full_name: string
    role: string
    classification: BoardMemberClassification
    profile_picture: url
}

export interface IService {
    id: string
    title: string
    description: string
    descriptive_image: url
}

export interface IJobApplicant {
    cover_letter: string
    createdAt: string
    email: string
    first_name: string
    id: string
    jobId: string
    last_name: string
    phone_number: string
    resume: string
    updatedAt: string
}


export interface IJobPosition {
    id: string
    title: string
    type: string
    location: string
    isOpen: boolean
    applications: IJobApplicant[]
    description: string
}

export interface IReview {
    id: string
    reviewer_company: string,
    review_message: string,
    reviewer_name: string,
    reviewer_image: url
}


export interface IVisit {
    createdAt: string,
    location: string
}


export interface IPhoto {
    id: string,
    title: string,
    description: string
    image: string
}