import { Suspense } from 'react';
import { getIdeas } from '@/lib/actions';
import { IdeaCard } from '@/components/idea-card';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb } from 'lucide-react';

async function IdeaList() {
  const ideas = await getIdeas();

  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center mt-8">
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
}

function IdeaListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
    );
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-screen-2xl py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Your Idea Vault</h1>
            <Suspense fallback={<IdeaListSkeleton />}>
              <IdeaList />
            </Suspense>
        </div>
      </main>
    </div>
  );
}
