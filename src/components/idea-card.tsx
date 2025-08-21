import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Idea } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 bg-card/80 backdrop-blur-sm border-primary/10 hover:border-primary/30">
      <CardHeader>
        <CardTitle>{idea.title}</CardTitle>
        <CardDescription className="text-xs">
          {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">
          {idea.content}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
