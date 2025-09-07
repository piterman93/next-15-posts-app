"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./utils/db";
import { notFound, redirect } from "next/navigation";
import { PostFormData } from "@/lib/validations/post";

// Helper function for authentication check
async function requireAuth() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/register");
  }

  return user;
}

export async function addNewPost(formData: PostFormData) {
  const user = await requireAuth();
  const { content, imageUrl, title } = formData;

  await prisma.blogPost.create({
    data: {
      title,
      content,
      imageUrl,
      authorImage: user?.picture || "",
      authorName: user?.given_name || user?.email || "Unknown",
      authorId: user?.id || "unknown",
    },
  });

  redirect("/dashboard");
}

export async function getRecentPosts(userId: string) {
  const posts = await prisma.blogPost.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });

  return posts;
}

export async function getPostById(postId: string) {
  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return notFound();
  }

  return post;
}

export async function updatePost(postId: string, formData: PostFormData) {
  const user = await requireAuth();
  const { content, imageUrl, title } = formData;

  await prisma.blogPost.update({
    where: { id: postId },
    data: {
      title,
      content,
      imageUrl,
    },
  });

  redirect("/dashboard");
}

export async function deletePost(postId: string) {
  const user = await requireAuth();

  // Check if user is the author
  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post || post.authorId !== user?.id) {
    throw new Error("Unauthorized to delete this post");
  }

  await prisma.blogPost.delete({
    where: { id: postId },
  });

  redirect("/dashboard");
}
