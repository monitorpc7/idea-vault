'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ideas } from './data';
import type { Idea } from './types';

const IdeaSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  content: z.string().min(10, 'Content must be at least 10 characters.'),
  tags: z.string(),
});

export async function getIdeas(): Promise<Idea[]> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
  return ideas.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function createIdea(formData: FormData) {
  const validatedFields = IdeaSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    tags: formData.get('tags'),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { title, content, tags } = validatedFields.data;
  const newIdea: Idea = {
    id: Date.now().toString(),
    title,
    content,
    tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
    createdAt: new Date(),
  };

  ideas.unshift(newIdea);
  
  revalidatePath('/');
  redirect('/');
}

export async function updateIdea(formData: FormData) {
  const validatedFields = IdeaSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    content: formData.get('content'),
    tags: formData.get('tags'),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, title, content, tags } = validatedFields.data;
  const ideaIndex = ideas.findIndex(idea => idea.id === id);

  if (ideaIndex === -1) {
    throw new Error('Idea not found');
  }

  ideas[ideaIndex] = {
    ...ideas[ideaIndex],
    title,
    content,
    tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
  };

  revalidatePath('/');
  redirect('/');
}


export async function deleteIdea(id: string) {
  const ideaIndex = ideas.findIndex(idea => idea.id === id);
  if (ideaIndex > -1) {
    ideas.splice(ideaIndex, 1);
    revalidatePath('/');
    redirect('/');
  }
}
