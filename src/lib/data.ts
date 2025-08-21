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
    tags: ['Education', 'Gamification', 'Culture', 'Mobile App'],
    createdAt: new Date('2023-11-15T14:30:00Z'),
  },
  {
    id: '3',
    title: 'Smart Home Plant Care System',
    content: 'An automated system that waters and provides light to indoor plants. It connects to a mobile app where users can monitor their plants\' health (moisture, light exposure) and get notifications. The system could have different modules for different plant types.',
    tags: ['IoT', 'Home Automation', 'Gardening'],
    createdAt: new Date('2024-01-20T09:00:00Z'),
  },
   {
    id: '4',
    title: 'Personalized Meal Planning Service',
    content: 'A subscription service that provides weekly meal plans based on dietary restrictions, preferences, and fitness goals. It would include recipes and an automated grocery list that could integrate with online shopping services.',
    tags: ['Health', 'Food', 'Subscription'],
    createdAt: new Date('2024-02-10T11:00:00Z'),
  },
  {
    id: '5',
    title: 'Virtual Reality Museum Tours',
    content: 'An immersive VR experience that allows users to tour famous museums from around the world. It could include guided tours by virtual docents, interactive exhibits, and historical context pop-ups. Great for education and accessibility.',
    tags: ['VR', 'Education', 'Culture'],
    createdAt: new Date('2024-03-05T16:45:00Z'),
  },
  {
    id: '6',
    title: 'AI-driven Code Review Assistant',
    content: 'A developer tool that integrates with Git repositories to provide intelligent code reviews. It would check for common errors, style inconsistencies, and potential performance issues, learning from team feedback over time.',
    tags: ['AI', 'Developer Tools', 'Productivity'],
    createdAt: new Date('2024-04-22T09:30:00Z'),
  },
];
