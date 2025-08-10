
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
    title: 'Neon Alleyway',
    prompt: 'A mysterious neon-lit alleyway at night, with rain-soaked pavement reflecting vibrant city lights and a lone figure in a futuristic coat walking into the distance.',
    imageUrl: '/images/08edf95ccf8baf7c411679092bdc3b42.jpg',
    hint: 'neon alleyway',
  },
  {
    title: 'Retro Arcade Dreams',
    prompt: 'A bustling retro arcade filled with glowing machines, pixel art posters, and kids playing classic games under a haze of colorful lights.',
    imageUrl: '/images/099f45ecfb8bc5b9be5fde9e8c66ef23.jpg',
    hint: 'retro arcade',
  },
  {
    title: 'Mystic Forest Path',
    prompt: 'A winding path through an ancient, misty forest, with towering trees, glowing mushrooms, and magical fireflies lighting the way.',
    imageUrl: '/images/1f14f87cad85c101c1097b5d13994abb.jpg',
    hint: 'mystic forest',
  },
  {
    title: 'Desert Mirage',
    prompt: 'A golden desert landscape with rolling dunes, a distant oasis, and a caravan of camels silhouetted against a blazing sunset.',
    imageUrl: '/images/1f934ed53a62c8d8974ad629256be26a.jpg',
    hint: 'desert mirage',
  },
  {
    title: 'Crystal Cavern',
    prompt: 'A hidden underground cavern filled with giant, glowing crystals in shades of blue and purple, reflecting light onto the cave walls.',
    imageUrl: '/images/2ce04b936820c857d744bb104acc8fcd.jpg',
    hint: 'crystal cavern',
  },
  {
    title: 'Skyline at Dusk',
    prompt: 'A panoramic city skyline at dusk, skyscrapers illuminated by the last rays of sunlight and the first twinkles of city lights.',
    imageUrl: '/images/36c98b4864e64efca8809578419657c1.jpg',
    hint: 'city skyline dusk',
  },
  {
    title: 'Cyberpunk Street Market',
    prompt: 'A vibrant cyberpunk street market with glowing signs, food stalls, and a diverse crowd of futuristic citizens shopping and socializing.',
    imageUrl: '/images/52964ffddcd0fe602abc4f667b3c2a57.jpg',
    hint: 'cyberpunk market',
  },
  {
    title: 'Rainy Night Drive',
    prompt: 'A sleek car driving through a rainy city at night, neon lights streaking across the wet windshield and reflections on the road.',
    imageUrl: '/images/6de49728e6fa60ca59df98f5fde8b330.jpg',
    hint: 'rainy night drive',
  },
  {
    title: 'Futuristic Skyline',
    prompt: 'A futuristic city skyline with towering skyscrapers, flying vehicles, and lush rooftop gardens under a clear blue sky.',
    imageUrl: '/images/7a628adce35d56c4060c27444577d808.jpg',
    hint: 'futuristic skyline',
  },
  {
    title: 'Enchanted Waterfall',
    prompt: 'A magical waterfall cascading into a crystal-clear pool, surrounded by vibrant flowers and glowing butterflies in a hidden valley.',
    imageUrl: '/images/9de02dd62431f4091bb31fb1d31072f0.jpg',
    hint: 'enchanted waterfall',
  },
  {
    title: 'Golden Temple',
    prompt: 'A majestic golden temple rising above a tranquil lake, with lotus flowers floating on the water and mountains in the background.',
    imageUrl: '/images/a87ed4d74c25528af03277e138a8b531.jpg',
    hint: 'golden temple',
  },
  {
    title: 'Urban Jungle',
    prompt: 'A city street overtaken by lush greenery, with vines climbing buildings and wild animals roaming freely among the abandoned cars.',
    imageUrl: '/images/d86181e00c14354b1712ebd2f4141792.jpg',
    hint: 'urban jungle',
  },
  {
    title: 'Starlit Beach',
    prompt: 'A peaceful beach at night, waves gently lapping the shore under a sky filled with stars and the soft glow of bioluminescent sand.',
    imageUrl: '/images/ebe330c0054d4ca2e9550b2f0fc1e326.jpg',
    hint: 'starlit beach',
  },
  {
    title: 'Mountain Explorer',
    prompt: 'A lone explorer standing atop a snowy mountain peak, gazing at the sunrise over a vast range of jagged, snow-capped mountains.',
    imageUrl: '/images/fa5643aaed41c07405d4a8223d1c05d4.jpg',
    hint: 'mountain explorer',
  },
  {
    title: 'Sunset Overlook',
    prompt: 'A breathtaking overlook with a view of rolling hills and a river winding through the valley, bathed in the warm glow of a setting sun.',
    imageUrl: '/images/fba3519cc7226a3e594290d8eea11c30.jpg',
    hint: 'sunset overlook',
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
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}
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
                <Button onClick={() => onUsePrompt(item.prompt, 'Cyberpunk')} variant="secondary" className="w-full">
                  <Wand2 /> Use This Prompt
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
