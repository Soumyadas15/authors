"use client"

import { Navbar } from "@/components/Navbar";
import { PostCard } from "@/components/PostCard";
import { AuthorCard } from "@/components/UserCard";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('/api/authors');
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
    const intervalId = setInterval(fetchAuthors, 100); 
    return () => clearInterval(intervalId);
  }, []);

  


  return (
    <div className="bg-white h-full w-full flex flex-col">
      <Navbar/>
      <div className="pt-16 pl-8 pr-8">
        <div
          className="
              mt-10
              grid 
              grid-cols-1
              sm:grid-cols-2 
              md:grid-cols-2 
              lg:grid-cols-4 
              xl:grid-cols-4 
              2xl:grid-cols-4
              gap-8
          "
        >
          {authors.map(author => (
            <AuthorCard 
                //@ts-ignore
                firstName={author.firstName!}
                //@ts-ignore
                lastName={author.lastName}
                //@ts-ignore
                posts={author.posts}
            />
          ))}
          
        </div>
      </div>
    </div>
  );
}
