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
import Button from "../Button";
import useAuthorModal from "@/hooks/useAuthorModal";

const AuthorModal = () => {

  const authorModal = useAuthorModal();

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      posts: '',
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
        const response = await fetch('/api/authors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            toast.error('Failed to add author')
            throw new Error('Failed to add author');
        }
        toast.success('Author added')
        const authorData = await response.json();
        console.log('Author data:', authorData);
    } catch (error) {
        console.error('Error adding author:', error);
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title=""
      />
      <Input
        id="firstName"
        label="First name"
        register={register}  
        errors={errors}
        required
      />
      <Input
        id="lastName"
        label="Last name"
        type="text"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="posts"
        label="Total posts"
        type="text"
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  return (
    <Modal
      isOpen={authorModal.isOpen}
      title="Add an author"
      actionLabel="Add"
      onClose={authorModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}

export default AuthorModal;