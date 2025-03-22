// Helper function to process blog data
export function processBlogData(blogs: any[], placeholderAvatar: string) {
    if (!Array.isArray(blogs)) return [];
    
    return blogs.map((blog, index) => {
        // Create author data if missing
        if (!blog.author) {
            blog.author = {
                name: "Author " + (index + 1),
                profile_picture: placeholderAvatar
            };
        }
        return blog;
    });
}

// Extract blog properties with fallbacks
export function extractBlogProps(blog: any, index: number, placeholderImage: string, placeholderAvatar: string) {
    return {
        id: blog.id || `blog-${index}`,
        title: blog.title || "Untitled Blog Post",
        description: blog.description || "",
        thumbnailUrl: blog.thumbnail_image || blog.cover_image || placeholderImage,
        authorName: blog.author?.name || "Unknown Author",
        authorImageUrl: blog.author?.profile_picture || placeholderAvatar,
        releaseDate: blog.releaseDate || blog.createdAt || new Date().toISOString()
    };
}

// Add this new function to generate slugs
export function createSlug(title: string, id: string): string {
    // If no title, just use the ID
    if (!title) return id;
    
    // Create a slug from the title
    const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Remove consecutive hyphens
        .substring(0, 60)         // Limit length
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    // Append the ID to ensure uniqueness
    return `${slug}-${id}`;
}

// Add this function to extract ID from slug
export function getIdFromSlug(slug: string): string | null {
    // Check if the slug has the expected format
    const parts = slug.split('-');
    
    // If we have enough parts and the last part looks like a UUID (has correct length)
    if (parts.length > 0) {
        const lastPart = parts[parts.length - 1];
        if (lastPart.length >= 32) {
            return lastPart;
        }
    }
    
    // If it's already an ID format (no slug part), return as is
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)) {
        return slug;
    }
    
    return null;
} 