import { Suspense } from 'react';
import { getIdeas } from '@/lib/actions';
import { IdeaCard } from '@/components/idea-card';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb } from 'lucide-react';
import { IdeaStats } from '@/components/idea-stats';
import type { Idea } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

async function IdeaList() {
  const ideas = await getIdeas();

  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card/50 p-12 text-center mt-8 col-span-1 lg:col-span-3">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
          <Lightbulb className="h-10 w-10 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Your vault is empty</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Click on &quot;New Idea&quot; to get started and capture your brilliant thoughts.
        </p>
      </div>
    );
  }

  return (
    <>
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </>
  );
}

function IdeaListSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 rounded-lg border bg-card p-6">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex gap-2 pt-4">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}

async function Stats() {
  const ideas: Idea[] = await getIdeas();
  return <IdeaStats ideas={ideas} />;
}

function StatsSkeleton() {
  return (
    <Card className="col-span-1 lg:col-span-4 h-[400px]">
      <CardHeader>
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-[280px]" />
      </CardContent>
    </Card>
  );
}


export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
      <Header />
      <main className="flex-1">
        <div className="container max-w-screen-2xl py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Your Idea Vault</h1>
            <p className="text-muted-foreground">An overview of your brilliant ideas.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Suspense fallback={<StatsSkeleton />}>
              <Stats />
            </Suspense>
          </div>

          <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={<IdeaListSkeleton />}>
              <IdeaList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
