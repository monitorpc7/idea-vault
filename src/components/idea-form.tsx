'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createIdea } from '@/lib/actions';
import { suggestTags } from '@/ai/flows/suggest-tags';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters.' }),
});

type IdeaFormProps = {
  onFormSubmit: () => void;
};

export function IdeaForm({ onFormSubmit }: IdeaFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const addSuggestedTag = (tag: string) => {
    if (!tags.includes(tag)) {
        setTags([...tags, tag]);
    }
    setSuggestedTags(suggestedTags.filter(t => t !== tag));
  };

  const handleSuggestTags = async () => {
    const content = form.getValues('content');
    if (!content || content.length < 20) {
      toast({
        variant: "destructive",
        title: "Content too short",
        description: "Please write more content before suggesting tags.",
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const result = await suggestTags({ ideaContent: content });
      setSuggestedTags(result.tags.filter(tag => !tags.includes(tag)));
    } catch (error) {
      console.error('Failed to suggest tags:', error);
      toast({
        variant: "destructive",
        title: "Suggestion Failed",
        description: "Could not suggest tags at this moment.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('tags', tags.join(','));
    
    await createIdea(formData);
    onFormSubmit();
    router.refresh(); // Refresh page to see new idea without a full reload
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI-Powered Personal Stylist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Rich Text Editor)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your idea in detail..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
            <FormLabel>Tags</FormLabel>
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Add a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                />
                <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting}>
                    {isSuggesting ? <Loader2 className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4 text-accent"/>}
                    <span className="ml-2 hidden sm:inline">Suggest</span>
                </Button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[2rem]">
                {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1.5 py-1 px-2 text-sm">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="rounded-full hover:bg-background/50 p-0.5">
                           <X className="h-3 w-3"/>
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
        
        {suggestedTags.length > 0 && (
             <div className="space-y-2">
                <FormLabel>Suggested Tags</FormLabel>
                <div className="flex flex-wrap gap-2">
                    {suggestedTags.map(tag => (
                        <Button key={tag} type="button" variant="outline" size="sm" onClick={() => addSuggestedTag(tag)}>
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>
        )}

        <Button type="submit" disabled={form.formState.isSubmitting} className="mt-4">
          {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
          Save Idea
        </Button>
      </form>
    </Form>
  );
}
