
'use client';

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import Image from 'next/image';

interface ExplorePromptsProps {
  onUsePrompt: (prompt: string, style?: string) => void;
}
const examplePrompts = [
  {
    title: 'Heavenly Sky Bridge',
    prompt: 'A majestic golden bridge arches above a sea of clouds, leading to a radiant city illuminated by celestial light, with the vast sky stretching into infinity.',
    imageUrl: '/Images/08edf95ccf8baf7c411679092bdc3b42.jpg',
    hint: 'sky bridge fantasy',
  },
  {
    title: 'Electric Neon Arcade',
    prompt: 'A bustling neon-lit arcade filled with retro game machines, vibrant lights, and the nostalgic energy of the 1980s.',
    imageUrl: '/Images/099f45ecfb8bc5b9be5fde9e8c66ef23.jpg',
    hint: 'neon arcade',
  },
  {
    title: 'Mystic Woodland Trail',
    prompt: 'A magical forest path winds through ancient trees, dappled sunlight and glowing flora creating an enchanted atmosphere.',
    imageUrl: '/Images/1f14f87cad85c101c1097b5d13994abb.jpg',
    hint: 'mystic woodland',
  },
  {
    title: 'Mirage of the Endless Dunes',
    prompt: 'Sweeping desert dunes stretch to the horizon, a shimmering oasis and caravan visible under the blazing sun.',
    imageUrl: '/Images/1f934ed53a62c8d8974ad629256be26a.jpg',
    hint: 'desert mirage',
  },
  {
    title: 'Crystal Grotto',
    prompt: 'A hidden cavern sparkles with massive blue and purple crystals, their glow reflecting off the stone walls.',
    imageUrl: '/Images/2ce04b936820c857d744bb104acc8fcd.jpg',
    hint: 'crystal grotto',
  },
  {
    title: 'Dusk Over the Metropolis',
    prompt: 'A sprawling city skyline at dusk, skyscrapers aglow with the last sunlight and the first city lights.',
    imageUrl: '/Images/36c98b4864e64efca8809578419657c1.jpg',
    hint: 'city dusk',
  },
  {
    title: 'Neon Street Bazaar',
    prompt: 'A lively cyberpunk street market, neon signs and food stalls illuminating a diverse futuristic crowd.',
    imageUrl: '/Images/52964ffddcd0fe602abc4f667b3c2a57.jpg',
    hint: 'neon street market',
  },
  {
    title: 'Midnight Rain Drive',
    prompt: 'A sleek car speeds through a rainy city at midnight, neon lights streaking across the wet windshield.',
    imageUrl: '/Images/6de49728e6fa60ca59df98f5fde8b330.jpg',
    hint: 'midnight rain drive',
  },
  {
    title: 'Tomorrow’s Skyline',
    prompt: 'A futuristic city with soaring skyscrapers, flying vehicles, and lush rooftop gardens under a clear blue sky.',
    imageUrl: '/Images/7a628adce35d56c4060c27444577d808.jpg',
    hint: 'future skyline',
  },
  {
    title: 'Starlit Tranquility Beach',
    prompt: 'Waves gently lap a quiet beach at night, the sand glowing softly under a sky filled with brilliant stars.',
    imageUrl: '/Images/9de02dd62431f4091bb31fb1d31072f0.jpg',
    hint: 'starlit beach',
  },
  {
    title: 'Temple of Golden Reflections',
    prompt: 'A magnificent golden temple rises above a serene lake, lotus flowers floating on the water, mountains in the distance.',
    imageUrl: '/Images/a87ed4d74c25528af03277e138a8b531.jpg',
    hint: 'golden temple',
  },
  {
    title: 'Urban Rainforest',
    prompt: 'A city street reclaimed by nature, with thick vines, lush greenery, and wild animals among the buildings.',
    imageUrl: '/Images/d86181e00c14354b1712ebd2f4141792.jpg',
    hint: 'urban rainforest',
  },
  {
    title: 'Glow of the Bioluminescent Bay',
    prompt: 'A magical bay at night, glowing blue with bioluminescent waves under a starry sky.',
    imageUrl: '/Images/ebe330c0054d4ca2e9550b2f0fc1e326.jpg',
    hint: 'bioluminescent bay',
  },
  {
    title: 'Summit of the Explorer',
    prompt: 'A lone adventurer stands atop a snowy mountain peak, watching the sunrise over a vast, rugged range.',
    imageUrl: '/Images/fa5643aaed41c07405d4a8223d1c05d4.jpg',
    hint: 'mountain summit explorer',
  },
  {
    title: 'Sunset Valley Vista',
    prompt: 'A breathtaking overlook with rolling hills and a winding river, all bathed in the warm glow of sunset.',
    imageUrl: '/Images/fba3519cc7226a3e594290d8eea11c30.jpg',
    hint: 'sunset valley',
  },
];

export function ExplorePrompts({ onUsePrompt }: ExplorePromptsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Explore What&apos;s Possible
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examplePrompts.map((item, index) => (
          <Card 
            key={item.title} 
            className="overflow-hidden group bg-card/80 backdrop-blur-sm animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
          >
            <CardContent className="p-0">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={item.hint}
              />
            </CardContent>
            <div className='p-4'>
                <CardTitle className="text-xl mb-2 text-foreground">{item.title}</CardTitle>
                <CardDescription className='mb-4 text-muted-foreground/80'>
                {item.prompt}
                </CardDescription>
                <Button onClick={() => onUsePrompt(item.prompt)} variant="secondary" className="w-full">
                  <Wand2 /> Use This Prompt
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
