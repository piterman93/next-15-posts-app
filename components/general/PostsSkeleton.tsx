import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostsSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card
          key={index}
          className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="aspect-video relative overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>

          <CardHeader>
            {/* Title Skeleton */}
            <Skeleton className="h-6 w-3/4 mb-2" />

            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Author and Date Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-3 h-3" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
