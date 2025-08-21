import type { Idea } from './types';

// In-memory store for ideas
export const ideas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Personal Stylist',
    content: 'An app that uses AI to suggest outfits based on your existing wardrobe, weather, and calendar events. Users can upload photos of their clothes, and the app will create a digital closet. It can also recommend new pieces to buy that complement their current style.',
    tags: ['AI', 'Fashion', 'Mobile App'],
    createdAt: new Date('2023-10-26T10:00:00Z'),
  },
  {
    id: '2',
    title: 'Gamified Language Learning for Niche Languages',
    content: 'A mobile app similar to Duolingo but focused on preserving and teaching endangered or niche languages. It would use gamification, storytelling, and community features to engage learners. Partner with cultural institutions to ensure authenticity.',
    tags: ['Education', 'Gamification', 'Culture'],
    createdAt: new Date('2023-11-15T14:30:00Z'),
  },
  {
    id: '3',
    title: 'Smart Home Plant Care System',
    content: 'An automated system that waters and provides light to indoor plants. It connects to a mobile app where users can monitor their plants\' health (moisture, light exposure) and get notifications. The system could have different modules for different plant types.',
    tags: ['IoT', 'Home Automation', 'Gardening'],
    createdAt: new Date('2024-01-20T09:00:00Z'),
  },
];
