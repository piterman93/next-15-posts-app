import { getPostById } from "@/app/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import EditPostClient from "./EditPostClient";

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/register");
  }

  // Await params before using
  const { id } = await params;

  const post = await getPostById(id);

  if (!post) {
    redirect("/dashboard");
  }

  // Check if user is the author
  const isAuthor = post.authorId === user?.id;

  if (!isAuthor) {
    redirect("/dashboard");
  }

  return (
    <EditPostClient
      postId={id}
      backHref={`/dashboard/post/${id}`}
      initialData={{
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
      }}
    />
  );
}
