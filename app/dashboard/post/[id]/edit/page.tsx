import { getPostById } from "@/app/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import EditPostForm from "./EditPostForm";

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

  const post = await getPostById(params.id);

  if (!post) {
    redirect("/dashboard");
  }

  // Check if user is the author
  const isAuthor = post.authorId === user?.id;

  if (!isAuthor) {
    redirect("/dashboard");
  }

  return <EditPostForm post={post} />;
}
