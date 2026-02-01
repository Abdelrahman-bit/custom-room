import type { CeramicCategory } from './types';

// Categories of ceramics, each containing multiple texture/pattern options

export const categories: CeramicCategory[] = [
  {
    id: 'cat_marble',
    name: 'Marble',
    thumbnailUrl: '/pattern-1.jpeg',
    variants: [
      { 
        id: 'var_marble_1', name: 'Pattern 1', type: 'texture', pattern: 'grid', 
        textureUrl: '/pattern-1.jpeg', thumbnailUrl: '/pattern-1.jpeg',
        roughness: 0.1, metalness: 0, tileRepeat: 2
      },
      { 
        id: 'var_marble_2', name: 'Pattern 2', type: 'texture', pattern: 'grid', 
        textureUrl: '/pattern-2.jpg', thumbnailUrl: '/pattern-2.jpg',
        roughness: 0.1, metalness: 0, tileRepeat: 2
      },
       { 
        id: 'var_marble_3', name: 'Pattern 3', type: 'texture', pattern: 'grid', 
        textureUrl: '/pattern-3.jpg', thumbnailUrl: '/pattern-3.jpg',
        roughness: 0.1, metalness: 0, tileRepeat: 2
      },
       { 
        id: 'var_marble_4', name: 'Pattern 4', type: 'texture', pattern: 'grid', 
        textureUrl: '/pattern-4.webp', thumbnailUrl: '/pattern-4.webp',
        roughness: 0.1, metalness: 0, tileRepeat: 2
      },
    ]
  }
];
