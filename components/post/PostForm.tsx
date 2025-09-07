"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  FileText,
  Loader2,
  Edit,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { postFormSchema, PostFormData } from "@/lib/validations/post";
import { FormField } from "@/components/form/FormField";
import { PostPreview } from "@/components/post/PostPreview";
import {
  TipsCard,
  WRITING_TIPS,
  EDITING_TIPS,
} from "@/components/post/TipsCard";

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: Partial<PostFormData>;
  postId?: string;
  authorName?: string;
  backHref: string;
  onSubmit: (data: PostFormData) => Promise<void>;
  onCancel?: () => void;
}

export function PostForm({
  mode,
  initialData = {},
  postId,
  authorName,
  backHref,
  onSubmit,
  onCancel,
}: PostFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImageError, setPreviewImageError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: yupResolver(postFormSchema),
    defaultValues: initialData,
  });

  const watchedValues = watch();
  const imageUrl = watch("imageUrl");

  // Reset preview error when image URL changes
  useEffect(() => {
    if (imageUrl && !errors.imageUrl) {
      setPreviewImageError(false);
    }
  }, [imageUrl, errors.imageUrl]);

  const handleFormSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      if (mode === "create") {
        reset();
        setPreviewImageError(false);
      }
    } catch (error) {
      console.error(
        `Error ${mode === "create" ? "creating" : "updating"} post:`,
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    reset();
    setPreviewImageError(false);
  };

  const isEdit = mode === "edit";
  const title = isEdit ? "Edit Post" : "Create New Post";
  const description = isEdit
    ? "Update your post content and settings"
    : "Share your thoughts and ideas with the world";
  const cardTitle = "Post Details";
  const cardDescription = isEdit
    ? "Update the information below to modify your blog post"
    : "Fill in the information below to create your blog post";
  const submitText = isEdit ? "Update Post" : "Create Post";
  const loadingText = isEdit ? "Updating..." : "Creating...";

  return (
    <div className="py-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link href={backHref}>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {isEdit ? "Back to Post" : "Back to Dashboard"}
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Separator />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isEdit ? (
                  <Edit className="w-5 h-5" />
                ) : (
                  <FileText className="w-5 h-5" />
                )}
                {cardTitle}
              </CardTitle>
              <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-6"
              >
                <FormField
                  id="title"
                  label="Title"
                  placeholder="Enter your post title..."
                  register={register}
                  error={errors.title?.message}
                />

                <FormField
                  id="imageUrl"
                  label="Image URL"
                  type="input-with-icon"
                  placeholder="https://example.com/image.jpg"
                  icon={ImageIcon}
                  register={register}
                  error={errors.imageUrl?.message}
                />

                <FormField
                  id="content"
                  label="Content"
                  type="textarea"
                  placeholder="Write your post content here..."
                  rows={12}
                  register={register}
                  error={errors.content?.message}
                />

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isLoading ? loadingText : submitText}
                  </Button>
                  {isEdit ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview and Tips */}
        <div className="space-y-6">
          <PostPreview
            title={watchedValues.title || ""}
            content={watchedValues.content || ""}
            imageUrl={watchedValues.imageUrl || ""}
            authorName={authorName}
            mode={mode}
            isImageError={previewImageError}
            onImageError={() => setPreviewImageError(true)}
          />

          <TipsCard
            title={isEdit ? "Editing Tips" : "Writing Tips"}
            tips={isEdit ? EDITING_TIPS : WRITING_TIPS}
          />
        </div>
      </div>
    </div>
  );
}
