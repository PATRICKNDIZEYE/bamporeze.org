import { Text } from "@repo/ui/units";
import { Locale } from "../../../../../i18n.config";
import SectionTitle from "../../../../components/units/sectionTitle";
import BlogCard from "../../../../components/blog/BlogCard";
import { getBlogs } from "../../../../utils/api";
import { getDictionary } from "../../../../utils/dictionary";
import { processBlogData, extractBlogProps } from "../../../../utils/blog-helpers";
import Link from "next/link";

// Base64 encoded SVG placeholders
const PLACEHOLDER_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzQ3NTU2OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiPkJsb2cgSW1hZ2U8L3RleHQ+PC9zdmc+";
const PLACEHOLDER_AVATAR = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2UyZThmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM0NzU1NjkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5VPC90ZXh0Pjwvc3ZnPg==";

export default async function AllBlogs({ params }: { params: { lang: Locale } }) {
    const dictionary = getDictionary(params.lang);
    
    try {
        // Fetch and process blog data
        const blogsResponse = await getBlogs();
        const blogs = Array.isArray(blogsResponse?.data) 
            ? blogsResponse.data 
            : Array.isArray(blogsResponse) 
                ? blogsResponse 
                : [];
        
        // Process blogs to ensure they have all required data
        const processedBlogs = processBlogData(blogs, PLACEHOLDER_AVATAR);
        
        // Handle no blogs case
        if (processedBlogs.length === 0) {
            return (
                <div className="py-10 flex flex-col gap-6">
                    <SectionTitle 
                        direction="horizontal" 
                        title={dictionary.pages?.blog?.more_blogs?.title || "More from our blog"} 
                        subtitle={dictionary.pages?.blog?.more_blogs?.subtitle || "Check out other posts"} 
                    />
                    <div className="text-center p-10 bg-gray-50 rounded-lg">
                        <Text>No blog posts available at the moment.</Text>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="py-10 flex flex-col gap-8 w-full">
                <SectionTitle 
                    direction="horizontal" 
                    title={dictionary.pages?.blog?.more_blogs?.title || "More from our blog"} 
                    subtitle={dictionary.pages?.blog?.more_blogs?.subtitle || "Check out other posts"} 
                />
                
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 w-full">
                    {processedBlogs.map((blog, index) => {
                        // Extract blog props with fallbacks
                        const props = extractBlogProps(blog, index, PLACEHOLDER_IMAGE, PLACEHOLDER_AVATAR);
                        
                        // Render blog card with extracted props
                        return (
                            <BlogCard 
                                key={props.id || index}
                                {...props}
                                index={index}
                            />
                        );
                    })}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return (
            <div className="py-10 flex flex-col gap-6">
                <SectionTitle 
                    direction="horizontal" 
                    title={dictionary.pages?.blog?.more_blogs?.title || "More from our blog"} 
                    subtitle={dictionary.pages?.blog?.more_blogs?.subtitle || "Check out other posts"} 
                />
                <div className="text-center p-10 bg-red-50 rounded-lg">
                    <Text>There was an error loading blog posts. Please try again later.</Text>
                </div>
            </div>
        );
    }
}