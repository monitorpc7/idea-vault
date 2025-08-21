
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { supabase } from './supabaseClient';
import type { Idea } from './types';

const IdeaSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  content: z.string().min(10, 'Content must be at least 10 characters.'),
  tags: z.string(), // Tags are received as a comma-separated string
});

export async function getIdeas(): Promise<Idea[]> {
  const { data: ideas, error } = await supabase
    .from('ideas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching ideas:', error);
    return [];
  }

  // Manually convert created_at to Date objects
  return ideas.map(idea => ({
    ...idea,
    createdAt: new Date(idea.created_at),
  }));
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
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];

  const { error } = await supabase
    .from('ideas')
    .insert([{ title, content, tags: tagsArray }]);

  if (error) {
    console.error('Error creating idea:', error);
    // Optionally return an error message to the client
    return {
      error: 'Failed to create idea.',
    };
  }

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
   const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];

  if (!id) {
    return { error: 'Idea ID is missing.' };
  }
  
  const { error } = await supabase
    .from('ideas')
    .update({ title, content, tags: tagsArray })
    .eq('id', id);

  if (error) {
    console.error('Error updating idea:', error);
    return {
      error: 'Failed to update idea.',
    };
  }

  revalidatePath('/');
  redirect('/');
}

export async function deleteIdea(id: string) {
  const { error } = await supabase
    .from('ideas')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting idea:', error);
     return {
      error: 'Failed to delete idea.',
    };
  }

  revalidatePath('/');
  redirect('/');
}
