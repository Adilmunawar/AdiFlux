
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
        title: 'Cybernetic Face-Off',
        prompt: 'Two futuristic androids face each other in a tense standoff, their metallic bodies illuminated by vibrant pink and blue neon lights in a dark, high-tech cityscape.',
        imageUrl: '/images/explore/image-1.png',
        hint: 'cybernetic standoff',
        style: 'Cyberpunk',
    },
    {
        title: 'Ancient Oasis',
        prompt: 'A serene oasis at the foot of the great pyramids, with a grand temple entrance and lush palm trees reflecting in the calm, turquoise water.',
        imageUrl: '/images/explore/image-2.png',
        hint: 'ancient oasis',
        style: 'Photorealistic',
    },
    {
        title: 'Solar Punk Utopia',
        prompt: 'A futuristic eco-city where nature and technology coexist in harmony, with buildings covered in lush greenery and powered by solar panels.',
        imageUrl: '/images/explore/image-3.png',
        hint: 'solarpunk utopia',
        style: 'Fantasy Art',
    },
    {
        title: 'Interstellar Nebula',
        prompt: 'A breathtaking view of a colorful interstellar gas cloud, with newborn stars igniting within its swirling cosmic dust.',
        imageUrl: '/images/explore/image-4.png',
        hint: 'interstellar nebula',
        style: 'Abstract',
    },
    {
        title: 'Crystal Desert',
        prompt: 'A vast desert landscape at sunset, where giant, shimmering crystals erupt from the sandy dunes, catching the last rays of light.',
        imageUrl: '/images/explore/image-5.png',
        hint: 'crystal desert',
        style: 'Surrealist',
    },
    {
        title: 'Floating Sky Castle',
        prompt: 'An majestic castle floating high in the clouds, with waterfalls cascading down its sides into the endless sky below.',
        imageUrl: '/images/explore/image-6.png',
        hint: 'sky castle',
        style: 'Fantasy Art',
    },
    {
        title: 'Steampunk Explorer',
        prompt: 'A Victorian-era explorer wearing intricate goggles and brass machinery, standing in front of a complex, steam-powered airship.',
        imageUrl: '/images/explore/image-7.png',
        hint: 'steampunk explorer',
        style: 'Vintage Photo',
    },
    {
        title: 'Enchanted Forest Path',
        prompt: 'A magical forest path at night, illuminated by glowing mushrooms and ethereal floating lights, with ancient, mossy trees.',
        imageUrl: '/images/explore/image-8.png',
        hint: 'enchanted forest',
        style: 'Fantasy Art',
    },
    {
        title: 'Deep Sea Metropolis',
        prompt: 'An underwater city with bioluminescent buildings and advanced submarines navigating through coral reefs and mysterious ocean trenches.',
        imageUrl: '/images/explore/image-9.png',
        hint: 'underwater city',
        style: 'Cyberpunk',
    },
    {
        title: 'Minimalist Mountain',
        prompt: 'A single, sharp mountain peak against a clear, gradient sky, with its reflection perfectly mirrored in a still lake below. Simple, clean lines.',
        imageUrl: '/images/explore/image-10.png',
        hint: 'minimalist mountain',
        style: 'Minimalist',
    },
    {
        title: 'Gothic Library',
        prompt: 'A vast, gothic library with towering shelves of ancient books, vaulted ceilings, and dramatic light filtering through stained-glass windows.',
        imageUrl: '/images/explore/image-11.png',
        hint: 'gothic library',
        style: 'Photorealistic',
    },
    {
        title: 'Abstract Lava Flow',
        prompt: 'An abstract, top-down view of a volcanic eruption, with vibrant orange and red lava flows creating intricate patterns against black rock.',
        imageUrl: '/images/explore/image-12.png',
        hint: 'abstract lava',
        style: 'Abstract',
    },
    {
        title: 'Pop Art Portrait',
        prompt: 'A vibrant, stylized portrait of a woman in the style of Roy Lichtenstein, using bold colors, thick lines, and Ben-Day dots.',
        imageUrl: '/images/explore/image-13.png',
        hint: 'pop art portrait',
        style: 'Pop Art',
    },
    {
        title: 'Oil Painting Harvest',
        prompt: 'A classic oil painting of a rolling countryside during harvest season, with golden fields of wheat and farmers at work under a soft, cloudy sky.',
        imageUrl: '/images/explore/image-14.png',
        hint: 'oil painting harvest',
        style: 'Oil Painting',
    },
    {
        title: 'Watercolor Dragon',
        prompt: 'A majestic Chinese dragon painted in a delicate watercolor style, swirling through clouds with splashes of red, gold, and blue ink.',
        imageUrl: '/images/explore/image-15.png',
        hint: 'watercolor dragon',
        style: 'Watercolor',
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
                <Button onClick={() => onUsePrompt(item.prompt, item.style)} variant="secondary" className="w-full">
                  <Wand2 /> Use This Prompt
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
