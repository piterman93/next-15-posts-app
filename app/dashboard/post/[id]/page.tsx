import { getPostById } from "@/app/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Trash2, Calendar, User, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { DeletePostDialog } from "./DeletePostDialog";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="py-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link href={`/dashboard/post/${post.id}/edit`}>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Post
              </Button>
            </Link>
            <DeletePostDialog postId={post.id} postTitle={post.title} />
          </div>
        </div>
        <Separator />
      </div>

      {/* Post Content */}
      <div className="space-y-8">
        {/* Featured Image */}
        <div className="aspect-video relative overflow-hidden rounded-xl border shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Header */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Image
                  src={post.authorImage || "/default-avatar.png"}
                  alt={post.authorName}
                  width={32}
                  height={32}
                  className="rounded-full border"
                />
                <span className="font-medium">{post.authorName}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Published {formatDate(post.createdAt)}</span>
              </div>

              {post.updatedAt !== post.createdAt && (
                <div className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  <span>Updated {formatDate(post.updatedAt)}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{getReadingTime(post.content)}</span>
              </div>
            </div>
          </div>

          <Separator />
        </div>

        {/* Article Content */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {post.content}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Footer */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              About the Author
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Image
                src={post.authorImage || "/default-avatar.png"}
                alt={post.authorName}
                width={64}
                height={64}
                className="rounded-full border"
              />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{post.authorName}</h3>
                <p className="text-muted-foreground">
                  Content creator passionate about sharing knowledge and
                  insights through engaging blog posts.
                </p>
                <div className="flex gap-2">
                  <Link href={`/dashboard/post/${post.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit This Post
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
