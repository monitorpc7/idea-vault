
'use client';
import React from 'react';
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
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteIdeaDialog } from './delete-idea-dialog';
import { NewIdeaSheet } from './new-idea-sheet';

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showEditSheet, setShowEditSheet] = React.useState(false);

  return (
    <>
      <Card className="flex flex-col h-full transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 bg-card/60 backdrop-blur-xl border-primary/20 hover:border-primary/40">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle>{idea.title}</CardTitle>
              <CardDescription className="text-xs pt-1">
                {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-1">
              <NewIdeaSheet ideaToEdit={idea} />
              <DeleteIdeaDialog idea={idea} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-4">
            {idea.content}
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {idea.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal bg-primary/10 text-primary-foreground/80 border-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
