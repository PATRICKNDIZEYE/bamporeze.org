import { Text } from "@repo/ui/units";
import Image from "next/image";
import Link from "next/link";
import Author from "../../components/units/author";

// Placeholder images
const PLACEHOLDER_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzQ3NTU2OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiPkJsb2cgSW1hZ2U8L3RleHQ+PC9zdmc+";
const PLACEHOLDER_AVATAR = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2UyZThmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM0NzU1NjkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5VPC90ZXh0Pjwvc3ZnPg==";

// Props type for the component
interface BlogCardProps {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    authorName: string;
    authorImageUrl: string;
    releaseDate: string;
    index: number;
}

export default function BlogCard({
    id,
    title,
    description,
    thumbnailUrl = PLACEHOLDER_IMAGE,
    authorName = "Unknown Author",
    authorImageUrl = PLACEHOLDER_AVATAR,
    releaseDate,
    index
}: BlogCardProps) {
    // Use the ID directly with query parameter
    const blogId = id || `blog-${index}`;
    
    return (
        <Link href={`/blog?id=${blogId}`} className="w-full h-full">
            <div className="flex flex-col gap-4 h-full bg-white rounded-lg shadow-sm border border-brand-darkblue-10 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-video w-full overflow-hidden relative bg-gray-100">
                    <Image 
                        src={thumbnailUrl} 
                        alt={title} 
                        className="w-full h-full object-cover" 
                        width={500} 
                        height={300} 
                        loading="lazy"
                        unoptimized={true}
                    />
                </div>
                <div className="flex flex-col gap-3 p-5 flex-grow">
                    <div className="flex-1">
                        <Text variant="heading4" className="line-clamp-2 mb-2">
                            {title}
                        </Text>
                        <Text className="text-gray-600 line-clamp-2">
                            {description && description.length > 0 
                                ? `${description.slice(0, 100)}...` 
                                : "No description available"}
                        </Text>
                    </div>
                    <div className="pt-3 border-t border-gray-100 mt-auto">
                        <Author 
                            name={authorName} 
                            releaseDate={releaseDate} 
                            profile_image={authorImageUrl} 
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
} 