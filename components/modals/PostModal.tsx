'use client';

import { useCallback, useState } from "react";

import { signIn } from 'next-auth/react';
import { toast } from "react-hot-toast";

import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { useRouter } from "next/navigation";

import usePostModal from "@/hooks/usePostModal";

import Modal from "./Modal";
import Input from "@/components/Input";
import Heading from "../Heading";
import axios from "axios";

const PostModal = () => {
  const postModal = usePostModal();
  const router = useRouter();

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      body: '',
      views: '',
      reviews: '',
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      try {
        const response = await axios.post(`https://authors-eight.vercel.app/api/posts`, data);
        const postData = response.data;

        toast.success('Post added');
        console.log('Post data:', postData);
        postModal.onClose();
        router.refresh();

      } catch (error : any) {
        console.error('Error adding post:', error.response ? error.response.data : error);
        toast.error('Failed to add post');
      }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title=""
      />
      <Input
        id="author"
        label="Author"
        register={register}  
        errors={errors}
        required
      />
      <Input
        id="body"
        label="Body"
        type="text"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="reviews"
        label="Total reviews"
        register={register}  
        errors={errors}
        required
      />
      <Input
        id="views"
        label="Total views"
        register={register}  
        errors={errors}
        required
      />
    </div>
  )

  return (
    <Modal
      isOpen={postModal.isOpen}
      title="Add a post"
      actionLabel="Add"
      onClose={postModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default PostModal;