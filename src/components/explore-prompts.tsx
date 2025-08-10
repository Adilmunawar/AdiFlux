
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
    title: 'Neon City Reflections',
    prompt: 'A futuristic cityscape at night, neon lights reflecting off wet streets as people in cyberpunk attire walk by.',
    imageUrl: '/Images/08edf95ccf8baf7c411679092bdc3b42.jpg',
    hint: 'neon city reflections',
  },
  {
    title: 'Retro Arcade Glow',
    prompt: 'A vibrant retro arcade filled with glowing machines and nostalgic 80s decor, kids playing classic games.',
    imageUrl: '/Images/099f45ecfb8bc5b9be5fde9e8c66ef23.jpg',
    hint: 'retro arcade',
  },
  {
    title: 'Golden Hour Lake',
    prompt: 'A peaceful lake at sunset, golden light shimmering on the water, surrounded by trees and distant mountains.',
    imageUrl: '/Images/0d70bae9ebd1b814092d0ce81af69873.jpg',
    hint: 'golden hour lake',
  },
  {
    title: 'Enchanted Forest Path',
    prompt: 'A winding path through a magical forest, sunlight filtering through tall ancient trees and glowing plants.',
    imageUrl: '/Images/1f14f87cad85c101c1097b5d13994abb.jpg',
    hint: 'enchanted forest',
  },
  {
    title: 'Desert Mirage',
    prompt: 'A vast desert with rolling dunes, a distant oasis, and a caravan of camels under a blazing sun.',
    imageUrl: '/Images/1f934ed53a62c8d8974ad629256be26a.jpg',
    hint: 'desert mirage',
  },
  {
    title: 'Crystal Cavern',
    prompt: 'A hidden cavern filled with giant glowing crystals in blue and purple hues, reflecting light on the cave walls.',
    imageUrl: '/Images/2ce04b936820c857d744bb104acc8fcd.jpg',
    hint: 'crystal cavern',
  },
  {
    title: 'City at Dusk',
    prompt: 'A panoramic city skyline at dusk, skyscrapers illuminated by the last rays of sunlight and city lights.',
    imageUrl: '/Images/36c98b4864e64efca8809578419657c1.jpg',
    hint: 'city at dusk',
  },
  {
    title: 'Cyberpunk Market',
    prompt: 'A bustling cyberpunk street market with glowing signs, food stalls, and a diverse crowd of futuristic citizens.',
    imageUrl: '/Images/52964ffddcd0fe602abc4f667b3c2a57.jpg',
    hint: 'cyberpunk market',
  },
  {
    title: 'Rainy Night Drive',
    prompt: 'A sleek car driving through a rainy city at night, neon lights streaking across the wet windshield.',
    imageUrl: '/Images/6de49728e6fa60ca59df98f5fde8b330.jpg',
    hint: 'rainy night drive',
  },
  {
    title: 'Futuristic Skyline',
    prompt: 'A futuristic city skyline with towering skyscrapers, flying vehicles, and rooftop gardens under a blue sky.',
    imageUrl: '/Images/7a628adce35d56c4060c27444577d808.jpg',
    hint: 'futuristic skyline',
  },
  {
    title: 'Starlit Beach',
    prompt: 'A peaceful beach at night, waves lapping the shore under a sky filled with stars and glowing sand.',
    imageUrl: '/Images/9de02dd62431f4091bb31fb1d31072f0.jpg',
    hint: 'starlit beach',
  },
  {
    title: 'Golden Temple',
    prompt: 'A majestic golden temple rising above a tranquil lake, lotus flowers floating on the water and mountains behind.',
    imageUrl: '/Images/a87ed4d74c25528af03277e138a8b531.jpg',
    hint: 'golden temple',
  },
  {
    title: 'Urban Jungle',
    prompt: 'A city street overtaken by lush greenery, vines climbing buildings and wild animals roaming among cars.',
    imageUrl: '/Images/d86181e00c14354b1712ebd2f4141792.jpg',
    hint: 'urban jungle',
  },
  {
    title: 'Bioluminescent Bay',
    prompt: 'A glowing bay at night, bioluminescent waves lighting up the shoreline under a starry sky.',
    imageUrl: '/Images/ebe330c0054d4ca2e9550b2f0fc1e326.jpg',
    hint: 'bioluminescent bay',
  },
  {
    title: 'Mountain Explorer',
    prompt: 'A lone explorer atop a snowy mountain peak, gazing at sunrise over a vast range of jagged mountains.',
    imageUrl: '/Images/fa5643aaed41c07405d4a8223d1c05d4.jpg',
    hint: 'mountain explorer',
  },
  {
    title: 'Sunset Overlook',
    prompt: 'A breathtaking overlook with rolling hills and a river winding through the valley, bathed in sunset glow.',
    imageUrl: '/Images/fba3519cc7226a3e594290d8eea11c30.jpg',
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
