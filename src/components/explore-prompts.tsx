
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExplorePromptsProps {
  onUsePrompt: (prompt: string) => void;
}

const examplePrompts = [
    {
        title: 'Bioluminescent Forest',
        prompt: 'A mystical forest at midnight, filled with glowing, bioluminescent mushrooms and ethereal sprites dancing among ancient trees.',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/bioluminescent_forest.jpg',
        hint: 'bioluminescent forest',
    },
    {
        title: 'Solar Punk Utopia',
        prompt: 'A futuristic eco-city where nature and technology coexist in harmony, with buildings covered in lush greenery and powered by solar panels.',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/solarpunk_utopia.jpg',
        hint: 'solarpunk utopia',
    },
    {
        title: 'Interstellar Nebula',
        prompt: 'A breathtaking view of a colorful interstellar gas cloud, with newborn stars igniting within its swirling cosmic dust.',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/interstellar_nebula.jpg',
        hint: 'interstellar nebula',
    },
    {
        title: 'Crystal Desert',
        prompt: 'A vast desert landscape at sunset, where giant, shimmering crystals erupt from the sandy dunes, catching the last rays of light.',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/crystal_desert.jpg',
        hint: 'crystal desert',
    },
    {
        title: 'Floating Sky Castle',
        prompt: 'An majestic castle floating high in the clouds, with waterfalls cascading down its sides into the endless sky below.',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/sky_castle.jpg',
        hint: 'sky castle',
    },
    {
        title: 'Gothic Library',
        prompt: 'A grand, ancient library with towering shelves of books, intricate gothic architecture, and long, dramatic shadows cast by candlelight.',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/gothic_library.jpg',
        hint: 'gothic library',
    },
];

export function ExplorePrompts({ onUsePrompt }: ExplorePromptsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Explore What&apos;s Possible
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examplePrompts.map((item) => (
          <Card key={item.title} className="overflow-hidden group">
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
                <CardDescription className='mb-4'>
                {item.prompt}
                </CardDescription>
                <Button onClick={() => onUsePrompt(item.prompt)} className="w-full">
                Use This Prompt
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
