"use client"

import { Navbar } from "@/components/Navbar";
import { PostCard } from "@/components/PostCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
    const intervalId = setInterval(fetchPosts, 100); 
    return () => clearInterval(intervalId);
  }, []);

  const handleDeletePost = (postId : any) => {
    //@ts-ignore
    const deletePost = async (id) => {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          toast.error('Failed to delete')
          throw new Error('Something went wrong with the deletion');
        }
        toast.success('Post deleted')
        //@ts-ignore
        setPosts(currentPosts => currentPosts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Failed to delete the post:', error);
      }
    };
    deletePost(postId);
  };


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
          {posts.map(post => (
            <PostCard 
                //@ts-ignore
                id={post.id}
                //@ts-ignore
                author={post.author!}
                //@ts-ignore
                body={post.body!} 
                //@ts-ignore
                views={post.views}
                //@ts-ignore
                reviews={post.reviews}
                //@ts-ignore
                onDelete={handleDeletePost}
            />
          ))}
          
        </div>
      </div>
    </div>
  );
}
