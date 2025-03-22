import { Text } from "@repo/ui/units";
import Image from "next/image";
import Link from "next/link";
import { Locale } from "../../../../i18n.config";
import { getBlog, getBlogHighlight, getBlogs } from "../../../utils/api";
import Author from "../../../components/units/author";
import Tag from "../../../components/units/tag";
import { IWriting } from "@repo/ui/types";
import { redirect } from "next/navigation";
import SectionTitle from "../../../components/units/sectionTitle";
import BlogCard from "../../../components/blog/BlogCard";

// Base64 encoded SVG placeholders
const PLACEHOLDER_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzQ3NTU2OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiPkJsb2cgSW1hZ2U8L3RleHQ+PC9zdmc+";
const PLACEHOLDER_AVATAR = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2UyZThmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM0NzU1NjkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIj5VPC90ZXh0Pjwvc3ZnPg==";

export default async function Page({ params, searchParams }: { 
  params: { lang: Locale },
  searchParams: { id?: string }
}) {
  // If ID is provided in query params, show blog detail view
  const blogId = searchParams.id;
  
  if (blogId) {
    try {
      console.log("Fetching blog with ID:", blogId);
      
      // Fetch blog data using the ID parameter
      const blogData = await getBlog(blogId);
      console.log("API Response:", JSON.stringify(blogData, null, 2));
      
      // If we couldn't get the blog, redirect to the main blog page
      if (!blogData) {
        console.error("Blog not found with ID:", blogId);
        redirect('/blog');
      }
      
      // Fetch some other blogs for "Related Articles" section
      const blogsResponse = await getBlogs();
      const relatedBlogs = Array.isArray(blogsResponse?.data) 
          ? blogsResponse.data.filter(blog => blog.id !== blogId).slice(0, 3)
          : Array.isArray(blogsResponse) 
              ? blogsResponse.filter(blog => blog.id !== blogId).slice(0, 3)
              : [];
      
      // Check specifically for content
      console.log("Content available:", !!blogData.content, "Content length:", blogData.content?.length || 0);
      
      // Extract data with fallbacks
      const { 
          title = "Untitled Post", 
          content, 
          description = "", 
          thumbnail_image = PLACEHOLDER_IMAGE,
          writingType = "Blog", 
          author, 
          releaseDate = new Date().toISOString()
      } = blogData;
      
      // Check for empty content and provide a meaningful message
      const displayContent = content && content.trim().length > 0 
          ? content 
          : "<p>No content available for this blog post. The content may still be in preparation.</p>";
      
      // Prepare author data
      const authorName = author?.name || "Unknown Author";
      const authorImage = author?.profile_picture || PLACEHOLDER_AVATAR;
      
      // Format date for better display
      const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      return (
        <div className="flex flex-col w-full">
          {/* Full-width top section with gradient background */}
          <div className="w-full bg-gradient-to-b from-brand-darkblue-5 to-white py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              {/* Tag and title */}
              <div className="mb-6">
                <div className="mb-2">
                  <Tag text={writingType} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-brand-darkblue">{title}</h1>
              </div>
              
              {/* Author and date */}
              <div className="mb-8 flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <Image
                    src={authorImage}
                    alt={authorName}
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized={true}
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{authorName}</p>
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 w-full">
            {/* Featured image */}
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-8 shadow-lg">
              <Image 
                src={thumbnail_image} 
                alt={title} 
                width={1200} 
                height={675}
                className="w-full h-full object-cover" 
                unoptimized={true}
              />
            </div>
            
            {/* Description if available */}
            {description && (
              <div className="text-lg text-gray-700 mb-8 font-medium italic border-l-4 border-brand-darkblue-20 pl-4">
                {description}
              </div>
            )}
            
            {/* Main content with proper HTML rendering */}
            <article className="prose prose-lg max-w-none prose-headings:text-brand-darkblue prose-a:text-brand-darkblue">
              <div dangerouslySetInnerHTML={{ __html: displayContent }} />
            </article>
            
            {/* Share buttons and tags section */}
            <div className="border-t border-b border-gray-200 py-6 mt-12 mb-12">
              <div className="flex flex-wrap justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <span className="text-gray-500">Share this article:</span>
                  <div className="flex space-x-4 mt-2">
                    <Link 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`} 
                      className="text-gray-400 hover:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Twitter</span>
                    </Link>
                    <Link 
                      href={`https://www.facebook.com/sharer/sharer.php`} 
                      className="text-gray-400 hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Facebook</span>
                    </Link>
                    <Link 
                      href={`https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(title)}`} 
                      className="text-gray-400 hover:text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>LinkedIn</span>
                    </Link>
                  </div>
                </div>
                <div>
                  <Tag text={writingType} />
                </div>
              </div>
            </div>
            
            {/* Related articles section */}
            {relatedBlogs.length > 0 && (
              <div className="mt-12">
                <SectionTitle
                  direction="horizontal"
                  title="Related Articles"
                  subtitle="You might also be interested in these"
                />
                
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
                  {relatedBlogs.map((blog, index) => (
                    <BlogCard
                      key={blog.id || index}
                      id={blog.id}
                      title={blog.title || "Untitled"}
                      description={blog.description || ""}
                      thumbnailUrl={blog.thumbnail_image || PLACEHOLDER_IMAGE}
                      authorName={blog.author?.name || "Unknown Author"}
                      authorImageUrl={blog.author?.profile_picture || PLACEHOLDER_AVATAR}
                      releaseDate={blog.releaseDate || blog.createdAt || new Date().toISOString()}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Back to all blogs button */}
            <div className="mt-12 text-center">
              <Link href="/blog" className="inline-block px-6 py-3 bg-brand-darkblue text-white rounded-md hover:bg-brand-darkblue-70 transition duration-200">
                Back to All Blogs
              </Link>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error displaying blog post:", error);
      redirect('/blog');
    }
  }
  
  // If no ID provided, show the blog highlight/homepage
  const blogResponseUn = await getBlogHighlight();
  const blogResponse = blogResponseUn.data as IWriting;
  
  // If blog data is not available, show a fallback
  if (!blogResponse) {
      return (
          <div className="w-full flex flex-col gap-4">
              <Text variant="heading3">Blog</Text>
              <Text variant="paragraph">No blog posts available at the moment.</Text>
          </div>
      );
  }
  
  const blog = blogResponse;
  
  return (
      <div className="w-full flex flex-col gap-4">
          <Text variant="heading3">{blog.title}</Text>
          <Tag text={blog.writingType || "Blog"} />
          <Image 
              src={blog.thumbnail_image} 
              alt="Blog cover" 
              width={1200} 
              height={600} 
              className="w-full h-[40vh] object-cover" 
              loading="eager"
              unoptimized={true}
          />
          <div 
              className="prose prose-lg text-brand-darkblue my-4" 
              dangerouslySetInnerHTML={{ __html: blog.content || "" }} 
          />
          {blog.author && <Author name={blog.author.name} releaseDate={blog.releaseDate} />}
          <Link href={`/blog?id=${blog.id}`}>
              <Text variant="paragraph" className="text-brand-darkblue hover:underline">Read more</Text>
          </Link>
      </div>
  );
}