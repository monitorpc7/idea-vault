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
import { Plus } from "lucide-react";

export function NewIdeaSheet() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Idea
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-2xl w-full overflow-y-auto bg-background/95 backdrop-blur-sm">
        <SheetHeader>
          <SheetTitle>Capture a New Idea</SheetTitle>
          <SheetDescription>
            What brilliant concept is on your mind? Fill out the details below.
          </SheetDescription>
        </SheetHeader>
        <IdeaForm onFormSubmit={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
