"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ShareButtonsProps {
  title: string;
  blogId: string;
}

export default function ShareButtons({ title, blogId }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Set the URL once the component mounts on the client
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="flex space-x-4 mt-2">
      <Link
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`}
        className="text-gray-400 hover:text-blue-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Twitter</span>
      </Link>
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
        className="text-gray-400 hover:text-blue-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Facebook</span>
      </Link>
      <Link
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`}
        className="text-gray-400 hover:text-blue-700"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>LinkedIn</span>
      </Link>
    </div>
  );
} 