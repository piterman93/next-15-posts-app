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
  PlusCircle,
  Calendar,
  User,
  TrendingUp,
  FileText,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getRecentPosts } from "../actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
import { PostsSkeleton } from "@/components/general/PostsSkeleton";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const posts = await getRecentPosts(user?.id || "");

  return (
    <div className="py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Blog Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your blog posts and content
            </p>
          </div>
          <Link href="/dashboard/create">
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Create New Post
            </Button>
          </Link>
        </div>
        <Separator />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Posts
              </CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{posts.length}</div>
            <CardDescription className="text-xs">
              <span className="text-green-600">+2</span> this week
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Views
              </CardTitle>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">12,847</div>
            <CardDescription className="text-xs">
              <span className="text-green-600">+15.3%</span> from last month
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Engagement
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">8.4%</div>
            <CardDescription className="text-xs">
              <span className="text-green-600">+2.1%</span> from last month
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Authors
              </CardTitle>
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">3</div>
            <CardDescription className="text-xs">
              Active contributors
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Blog Posts Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<PostsSkeleton />}>
            {fetchPosts(user?.id || "")}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function fetchPosts(userId: string) {
  const posts = await getRecentPosts(userId);

  return posts.map((post) => (
    <Card
      key={post.id}
      className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {post.content}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={post.authorImage}
              alt={post.authorName}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-muted-foreground">
              {post.authorName}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {post.createdAt.toLocaleDateString()}
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link href={`/dashboard/post/${post.id}/edit`}>
            <Button variant="outline" size="sm" className="flex-1">
              Edit
            </Button>
          </Link>
          <Link href={`/dashboard/post/${post.id}`}>
            <Button variant="outline" size="sm" className="flex-1">
              View
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  ));
}
