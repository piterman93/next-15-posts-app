import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TipItem {
  color: string;
  text: string;
}

interface TipsCardProps {
  title: string;
  tips: TipItem[];
}

export function TipsCard({ title, tips }: TipsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm space-y-2">
          {tips.map((tip, index) => (
            <p key={index} className="flex items-start gap-2">
              <span className={tip.color}>•</span>
              <span>{tip.text}</span>
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Pre-defined tip sets
export const WRITING_TIPS: TipItem[] = [
  { color: "text-green-500", text: "Use descriptive and engaging titles" },
  {
    color: "text-blue-500",
    text: "Add high-quality images to attract readers",
  },
  { color: "text-purple-500", text: "Break content into short paragraphs" },
  { color: "text-orange-500", text: "Use headings to structure your content" },
];

export const EDITING_TIPS: TipItem[] = [
  { color: "text-green-500", text: "Review your content for clarity and flow" },
  { color: "text-blue-500", text: "Update images to keep content fresh" },
  { color: "text-purple-500", text: "Consider adding new insights or updates" },
  { color: "text-orange-500", text: "Check for any outdated information" },
];
