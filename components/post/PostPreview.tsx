import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, ImageIcon } from "lucide-react";
import Image from "next/image";

interface PostPreviewProps {
  title: string;
  content: string;
  imageUrl: string;
  authorName?: string;
  mode?: "create" | "edit";
  isImageError?: boolean;
  onImageError?: () => void;
}

export function PostPreview({
  title,
  content,
  imageUrl,
  authorName = "Your Name",
  mode = "create",
  isImageError = false,
  onImageError,
}: PostPreviewProps) {
  const displayTitle = title || "Your post title will appear here";
  const displayContent = content || "Your post content will appear here...";
  const truncatedContent = displayContent.slice(0, 200);
  const showEllipsis = displayContent.length > 200;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Preview
        </CardTitle>
        <CardDescription>
          See how your {mode === "edit" ? "updated " : ""}post will look
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Preview */}
        {imageUrl && !isImageError ? (
          <div className="aspect-video relative overflow-hidden rounded-lg border">
            <Image
              src={imageUrl}
              alt="Post preview"
              fill
              className="object-cover"
              onError={onImageError}
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
          <h3 className="font-semibold text-lg">{displayTitle}</h3>
        </div>

        {/* Content Preview */}
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {truncatedContent}
            {showEllipsis && "..."}
          </p>
        </div>

        {/* Meta Info */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-6 h-6 bg-muted rounded-full"></div>
            <span>{authorName}</span>
            <span>•</span>
            <span>
              {mode === "edit" ? "Updated" : "Published"}{" "}
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
