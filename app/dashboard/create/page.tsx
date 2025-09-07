"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Eye,
  ImageIcon,
  FileText,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { addNewPost, CreatePostFormData } from "@/app/actions";
import { redirect } from "next/navigation";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreatePostFormData>({
    resolver: yupResolver(createPostSchema),
  });

  const imageUrl = watch("imageUrl");

  // Update preview when URL changes
  useEffect(() => {
    if (imageUrl && !errors.imageUrl) {
      setPreviewImage(imageUrl);
    }
  }, [imageUrl, errors.imageUrl]);

  const onSubmit = async (data: CreatePostFormData) => {
    setIsLoading(true);
    try {
      await addNewPost(data);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
      reset();
      setPreviewImage("");
      redirect("/dashboard");
    }
  };

  return (
    <div className="py-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
          <p className="text-muted-foreground">
            Share your thoughts and ideas with the world
          </p>
        </div>
        <Separator />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Post Details
              </CardTitle>
              <CardDescription>
                Fill in the information below to create your blog post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your post title..."
                    {...register("title")}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Image URL Field */}
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="imageUrl"
                      placeholder="https://example.com/image.jpg"
                      {...register("imageUrl")}
                      className={`pl-10 ${errors.imageUrl ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.imageUrl && (
                    <p className="text-sm text-red-500">
                      {errors.imageUrl.message}
                    </p>
                  )}
                </div>

                {/* Content Field */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your post content here..."
                    rows={12}
                    {...register("content")}
                    className={errors.content ? "border-red-500" : ""}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500">
                      {errors.content.message}
                    </p>
                  )}
                </div>

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
                    {isLoading ? "Creating..." : "Create Post"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => reset()}
                  >
                    <Eye className="w-4 h-4" />
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview
              </CardTitle>
              <CardDescription>See how your post will look</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Preview */}
              {previewImage ? (
                <div className="aspect-video relative overflow-hidden rounded-lg border">
                  <Image
                    src={previewImage}
                    alt="Post preview"
                    fill
                    className="object-cover"
                    onError={() => setPreviewImage("")}
                  />
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center space-y-2">
                    <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Image preview will appear here
                    </p>
                  </div>
                </div>
              )}

              {/* Title Preview */}
              <div>
                <h3 className="font-semibold text-lg">
                  {watch("title") || "Your post title will appear here"}
                </h3>
              </div>

              {/* Content Preview */}
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {watch("content")?.slice(0, 200) ||
                    "Your post content will appear here..."}
                  {watch("content")?.length > 200 && "..."}
                </p>
              </div>

              {/* Meta Info */}
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-6 h-6 bg-muted rounded-full"></div>
                  <span>Your Name</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Writing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Use descriptive and engaging titles</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Add high-quality images to attract readers</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Break content into short paragraphs</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>Use headings to structure your content</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Validation schema
const createPostSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(20, "Content must be at least 20 characters")
    .max(5000, "Content must be less than 5000 characters"),
  imageUrl: yup
    .string()
    .required("Image URL is required")
    .url("Please enter a valid URL"),
});
