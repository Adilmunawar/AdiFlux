
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExplorePromptsProps {
  onUsePrompt: (prompt: string) => void;
}

const examplePrompts = [
    {
        title: 'Underwater Kingdom',
        prompt: 'Mystical realm beneath the waves with glowing coral and magical creatures',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/underwater.jpg',
        hint: 'underwater kingdom',
    },
    {
        title: 'Cyberpunk Metropolis',
        prompt: 'Futuristic cityscape with neon lights and advanced technology',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/cyberpunk.jpg',
        hint: 'cyberpunk metropolis',
    },
    {
        title: 'Enchanted Forest',
        prompt: 'Ancient woodland with mystical creatures and magical atmosphere',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/forest.jpg',
        hint: 'enchanted forest',
    },
    {
        title: 'Steampunk City',
        prompt: 'A bustling city powered by steam, with intricate clockwork mechanisms and Victorian-era fashion.',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/steampunk.jpg',
        hint: 'steampunk city',
    },
    {
        title: 'Cosmic Dream',
        prompt: 'A surreal landscape of swirling nebulae, distant galaxies, and floating crystalline structures.',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/cosmic.jpg',
        hint: 'cosmic dream',
    },
    {
        title: 'Forgotten Temple',
        prompt: 'An ancient jungle temple, overgrown with vines, with mysterious symbols carved into its stone walls.',
        imageUrl: 'https://storage.googleapis.com/gemini-studio-assets/explore/temple.jpg',
        hint: 'forgotten temple',
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
