"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IdeaForm } from "@/components/idea-form";
import { Edit, Plus } from "lucide-react";
import type { Idea } from '@/lib/types';

interface NewIdeaSheetProps {
    ideaToEdit?: Idea;
}

export function NewIdeaSheet({ ideaToEdit }: NewIdeaSheetProps) {
  const [open, setOpen] = React.useState(false);

  const isEditing = !!ideaToEdit;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {isEditing ? (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit Idea</span>
          </Button>
        ) : (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Idea
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-2xl w-full overflow-y-auto bg-background/90 backdrop-blur-xl border-border/50">
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Edit Idea' : 'Capture a New Idea'}</SheetTitle>
          <SheetDescription>
            {isEditing ? 'Update the details of your idea below.' : 'What brilliant concept is on your mind? Fill out the details below.'}
          </SheetDescription>
        </SheetHeader>
        <IdeaForm onFormSubmit={() => setOpen(false)} idea={ideaToEdit} />
      </SheetContent>
    </Sheet>
  );
}
