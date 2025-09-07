"use client";

import { PostForm } from "@/components/post/PostForm";
import { PostFormData } from "@/lib/validations/post";
import { updatePost } from "@/app/actions";

interface EditPostClientProps {
  postId: string;
  backHref: string;
  initialData: {
    title: string;
    content: string;
    imageUrl: string;
  };
}

export default function EditPostClient({
  postId,
  backHref,
  initialData,
}: EditPostClientProps) {
  const handleSubmit = async (data: PostFormData) => {
    await updatePost(postId, data);
  };

  return (
    <PostForm
      mode="edit"
      backHref={backHref}
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
}
