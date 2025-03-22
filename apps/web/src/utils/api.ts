import { IBoardMember, IJobPosition, IPartnerCompany, IPhoto, IReview, IService, ISlide, IWriting } from "@repo/ui/types"
import { cache } from "react"
import 'server-only'
import axios from 'axios'
import { IJob } from "../types"

// Define the enum locally to avoid import errors
enum BoardMemberClassification {
  BOARD_MEMBER = "BOARD_MEMBER",
  MANAGER = "MANAGER"
}

// Create API instance with base URL
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5123/api/v1',
    // Add any other config you need
});

export async function fetcher(url: string) {
    try {
        return await api.get(url)
    } catch (error) {
        console.warn(`Could not fetch ${url}, using fallback data:`, error)
        return { data: {} } // Return empty object to prevent undefined errors
    }
}

// FALLBACK DATA
// Sample blog data for fallback
const fallbackBlog = {
    id: "fallback-blog-1",
    title: "Understanding Educational Leadership",
    content: "Education leadership is crucial for developing effective learning environments...",
    thumbnail: "/placeholder-blog.jpg",
    created_at: new Date().toISOString(),
    category: "Leadership",
    author: "Admin"
};

// Sample slides for the homepage
const fallbackSlides: ISlide[] = [
    {
        id: "slide-1",
        title: "Welcome to Our Educational Institution",
        description: "Building tomorrow's leaders through quality education",
        cta_text: "Explore Programs",
        cta_link: "/admissions",
        image: "/placeholder-slide.jpg"
    },
    {
        id: "slide-2",
        title: "Discover Your Potential",
        description: "Join our community of learners and achieve excellence",
        cta_text: "Apply Now",
        cta_link: "/admissions",
        image: "/placeholder-slide-2.jpg"
    }
];

// Sample board members
const fallbackBoardMembers: IBoardMember[] = [
    {
        id: "member-1",
        name: "Dr. Jane Smith",
        title: "Board Chairperson",
        bio: "Dr. Smith has over 20 years of experience in educational leadership",
        image: "/placeholder-member.jpg",
        classification: BoardMemberClassification.BOARD_MEMBER
    },
    {
        id: "member-2",
        name: "Prof. John Davis",
        title: "Executive Director",
        bio: "Prof. Davis leads our institution's strategic initiatives",
        image: "/placeholder-member-2.jpg",
        classification: BoardMemberClassification.MANAGER
    }
];

// Sample services
const fallbackServices: IService[] = [
    {
        id: "service-1",
        title: "Academic Advising",
        description: "Get personalized guidance on your educational journey",
        icon: "academic"
    },
    {
        id: "service-2",
        title: "Career Development",
        description: "Prepare for your future career with our specialized programs",
        icon: "career"
    }
];

// Sample reviews
const fallbackReviews: IReview[] = [
    {
        id: "review-1",
        author: "Michael J.",
        content: "The programs offered exceeded my expectations. I gained valuable skills that helped advance my career.",
        rating: 5,
        position: "Graduate"
    },
    {
        id: "review-2",
        author: "Sarah L.",
        content: "Excellent faculty and course content. Highly recommended for anyone looking to enhance their knowledge.",
        rating: 4,
        position: "Student"
    }
];

// Sample gallery photos
const fallbackPhotos: IPhoto[] = [
    {
        id: "photo-1",
        title: "Campus View",
        description: "Our modern campus facilities",
        image_url: "/placeholder-photo.jpg"
    },
    {
        id: "photo-2",
        title: "Graduation Ceremony",
        description: "Celebrating our student achievements",
        image_url: "/placeholder-photo-2.jpg"
    }
];

// Sample partner companies
const fallbackPartnerCompanies = [
    {
        id: "partner-1",
        company_name: "ABC Corporation",
        company_logo: "/placeholder-logo.png"
    },
    {
        id: "partner-2",
        company_name: "XYZ Industries",
        company_logo: "/placeholder-logo-2.png"
    }
];

// Sample programs/jobs
const fallbackPrograms: IJob[] = [
    {
        id: "sample-program-1",
        title: "Administrative Management Certificate Program",
        type: "CONTRACT",
        isOpen: true,
        short_description: "Do you know that mastering this program can open career opportunities? This course will teach you essential skills, unlocking the secrets of success, making learning enjoyable, and empowering you to excel in any field.",
        location: "On Campus Learning",
        duration: "12 weeks"
    },
    {
        id: "sample-program-2",
        title: "Leadership Development Program",
        type: "FULL_TIME",
        isOpen: true,
        short_description: "This comprehensive program will develop your leadership skills, strategic thinking, and decision-making abilities needed for management roles in today's competitive environment.",
        location: "Hybrid Format",
        duration: "16 weeks"
    }
];

// API FUNCTIONS WITH FALLBACK DATA

export const getBlogHighlight = cache(async () => {
    try {
        const highlight = await fetcher('/writing/blogs/random')
        return highlight['data'] as IWriting
    } catch (error) {
        console.warn("Could not fetch blog highlight, using fallback data:", error)
        return fallbackBlog as IWriting
    }
})

export async function getBlogs(): Promise<IWriting[]> {
    try {
        const res = await fetcher('/writing/blogs/for-site')
        return res.data as IWriting[]
    } catch (error) {
        console.warn("Could not fetch blogs from API, using fallback data:", error)
        return [fallbackBlog] as IWriting[]
    }
}

export async function getGallery(): Promise<IPhoto[]> {
    try {
        const res = await fetcher('/gallery')
        return res.data?.data as IPhoto[] || fallbackPhotos
    } catch (error) {
        console.warn("Could not fetch gallery, using fallback data:", error)
        return fallbackPhotos
    }
}

export async function getBlog(blogId: string) {
    try {
        // Get the blog metadata (which already includes content)
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5123/api';
        const metadataResponse = await fetch(`${baseUrl}/writing/${blogId}`, {
            cache: 'no-store'
        });
        
        if (!metadataResponse.ok) {
            console.error(`Blog API metadata responded with status: ${metadataResponse.status}`);
            throw new Error(`Failed to fetch blog metadata: ${metadataResponse.status}`);
        }
        
        const blogData = await metadataResponse.json();
        
        // Increment read counter but don't overwrite content
        try {
            await fetch(`${baseUrl}/writing/read/${blogId}`, {
                cache: 'no-store'
            });
        } catch (error) {
            console.warn("Error incrementing read counter, ignoring:", error);
        }
        
        // Return the blog data with its original content
        return blogData.data; // Make sure we return the actual data object
    } catch (error) {
        console.error("Error fetching blog:", error);
        return fallbackBlog; // Return fallback blog data
    }
}

export async function getPressReleases(): Promise<IWriting[]> {
    try {
        const res = await fetcher('/writing/newsletter')
        return res.data as IWriting[]
    } catch (error) {
        console.warn("Could not fetch press releases, using fallback data:", error)
        return [{ ...fallbackBlog, category: "Press Release" }] as IWriting[]
    }
}

export async function getReviews(): Promise<IReview[]> {
    try {
        const res = await fetcher('/reviews')
        return res.data as IReview[]
    } catch (error) {
        console.warn("Could not fetch reviews, using fallback data:", error)
        return fallbackReviews
    }
}

export const getCompanies = async () => {
    try {
        const { data } = await api.get('/partner-companies');
        console.log("Companies data:", data);
        return data;
    } catch (error) {
        console.error('Error fetching partner companies:', error);
        return fallbackPartnerCompanies;
    }
}

export const getSlides = cache(async (): Promise<ISlide[]> => {
    try {
        const slides = await fetcher('/homepage-sliders')
        console.log('API Response:', slides)
        return slides['data'] as ISlide[] || fallbackSlides
    } catch (error) {
        console.error('Error fetching slides:', error)
        return fallbackSlides
    }
})

export const getBoardMembers = cache(async (classification?: BoardMemberClassification): Promise<IBoardMember[]> => {
    try {
        const members = await fetcher(`/officials/${classification ? `?classification=${classification}` : ``}`)
        return members.data as IBoardMember[] || fallbackBoardMembers
    } catch (error) {
        console.warn("Could not fetch board members, using fallback data:", error)
        if (classification) {
            return fallbackBoardMembers.filter(member => member.classification === classification)
        }
        return fallbackBoardMembers
    }
})

export const getServices = cache(async (): Promise<IService[]> => {
    try {
        const services = await fetcher('/services')
        return services.data as IService[] || fallbackServices
    } catch (error) {
        console.warn("Could not fetch services, using fallback data:", error)
        return fallbackServices
    }
})

export const getJobPositions = cache(async (): Promise<IJobPosition[]> => {
    try {
        const jobs = await fetcher('/jobs?type=open')
        // Use fallback data if the API request fails
        if (!jobs?.data?.data) {
            console.warn("Invalid job data format, using fallback data")
            return fallbackPrograms as IJobPosition[]
        }
        return jobs.data.data as IJobPosition[]
    } catch (error) {
        console.warn("Could not fetch job positions from API, using fallback data:", error)
        return fallbackPrograms as IJobPosition[]
    }
})

export const getSingleJob = cache(async (id: string): Promise<IJobPosition> => {
    try {
        const job = await fetcher(`/jobs/${id}`)
        return job.data as IJobPosition
    } catch (error) {
        console.warn(`Could not fetch job with ID ${id}, using fallback data:`, error)
        return fallbackPrograms.find(p => p.id === id) as IJobPosition || fallbackPrograms[0] as IJobPosition
    }
})

export const constructApiUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:5123/api/v1'
  // Ensure proper URL joining
  return new URL(path, baseUrl).toString()
}

export const getPartnerCompanies = async () => {
    try {
        const { data } = await api.get('/partner-companies');
        console.log("Partner companies data:", data);
        return data;
    } catch (error) {
        console.error('Error fetching partner companies:', error);
        return fallbackPartnerCompanies;
    }
}

export async function getBlogById(blogId: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5123/api';
        const response = await fetch(`${baseUrl}/writing/${blogId}`, {
            cache: 'no-store'
        });
        
        console.log(`Fetching blog with URL: ${baseUrl}/writing/${blogId}`);
        
        if (!response.ok) {
            console.error(`Blog API responded with status: ${response.status}`);
            throw new Error(`Failed to fetch blog: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        return { data: fallbackBlog };
    }
}

export const applyForJob = async (jobId: string, formData: any) => {
  try {
    // Convert the formData to match what your backend expects
    const apiFormData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      cover_letter: formData.qualifications, // Map qualifications to cover_letter for backend compatibility
      jobId: jobId,
      resume: null // Since we no longer collect this
    };
    
    const response = await axios.post('/job-applications', apiFormData);
    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    throw error;
  }
};