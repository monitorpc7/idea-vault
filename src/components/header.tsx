import { BrainCircuit } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { NewIdeaSheet } from '@/components/new-idea-sheet';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <BrainCircuit className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold">IdeaFlow</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <NewIdeaSheet />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
