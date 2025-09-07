"use client";

import { PostForm } from "@/components/post/PostForm";
import { addNewPost } from "@/app/actions";
import { PostFormData } from "@/lib/validations/post";

export default function CreatePost() {
  const handleSubmit = async (data: PostFormData) => {
    await addNewPost(data);
  };

  return (
    <PostForm mode="create" backHref="/dashboard" onSubmit={handleSubmit} />
  );
}
