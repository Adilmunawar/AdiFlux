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
    title: 'Palace of Reflections',
    prompt: 'A serene, moonlit chamber with towering golden arches reflected in the calm, shallow water below. A sense of peace and majesty pervades the grand hall.',
    imageUrl: '/Images/08edf95ccf8baf7c411679092bdc3b42.jpg',
    hint: 'moonlit palace water',
    style: 'Fantasy Art',
  },
  {
    title: 'Subterranean Cascade',
    prompt: 'A colossal waterfall thunders into a hidden underground cavern, its mist catching the faint light from an unseen source, illuminating the cavernous space.',
    imageUrl: '/Images/099f45ecfb8bc5b9be5fde9e8c66ef23.jpg',
    hint: 'waterfall cavern fantasy',
    style: 'Fantasy Art',
  },
  {
    title: 'City in a Globe',
    prompt: 'A futuristic city with towering skyscrapers and lush parks encapsulated within a glass sphere, floating gently on a tranquil body of water under a dramatic sky.',
    imageUrl: '/Images/1f14f87cad85c101c1097b5d13994abb.jpg',
    hint: 'futuristic city globe',
    style: 'Cyberpunk',
  },
  {
    title: 'Cosmic Genesis',
    prompt: 'A vibrant planet, teeming with life, bursts forth from a celestial waterfall, its rings glowing with cosmic energy against the backdrop of a starry nebula.',
    imageUrl: '/Images/1f934ed53a62c8d8974ad629256be26a.jpg',
    hint: 'cosmic planet nebula',
    style: 'Fantasy Art',
  },
  {
    title: 'Bedtime Panda',
    prompt: 'A cute, fluffy panda wearing cozy blue star-patterned pajamas sits in a warmly lit bedroom, ready for a bedtime story. The panda looks soft and huggable.',
    imageUrl: '/Images/2ce04b936820c857d744bb104acc8fcd.jpg',
    hint: 'cute panda pajamas',
    style: 'Photorealistic',
  },
  {
    title: 'Miniature Metropolis',
    prompt: 'A bustling miniature city sits inside a coffee cup, with glowing lights and tiny details, held against the backdrop of a real city at dusk.',
    imageUrl: '/Images/36c98b4864e64efca8809578419657c1.jpg',
    hint: 'miniature city cup',
    style: 'Surrealist',
  },
  {
    title: 'Canyon Vista',
    prompt: 'A vast, epic canyon landscape at sunset, with a lone figure looking out over the dramatic cliffs and the river winding below, under a fiery sky.',
    imageUrl: '/Images/52964ffddcd0fe602abc4f667b3c2a57.jpg',
    hint: 'canyon sunset landscape',
    style: 'Photorealistic',
  },
  {
    title: 'Floating Island Sanctuary',
    prompt: 'A massive, moss-covered rock island floats peacefully in a clear blue sky, with a gentle waterfall cascading into the clouds below.',
    imageUrl: '/Images/6de49728e6fa60ca59df98f5fde8b330.jpg',
    hint: 'floating island waterfall',
    style: 'Fantasy Art',
  },
  {
    title: 'Nature Meets Tech',
    prompt: 'A vibrant, lush ecosystem thrives inside an open laptop, blurring the lines between the digital world and nature. A small bird perches on the screen.',
    imageUrl: '/Images/7a628adce35d56c4060c27444577d808.jpg',
    hint: 'nature laptop tech',
    style: 'Surrealist',
  },
  {
    title: 'Celestial Wave',
    prompt: 'A colossal, crystalline wave, shimmering with cosmic light and internal galaxies, crests in the vastness of space. A single planet sits perilously close.',
    imageUrl: '/Images/9de02dd62431f4091bb31fb1d31072f0.jpg',
    hint: 'cosmic wave space',
    style: 'Fantasy Art',
  },
  {
    title: 'River Through the Valley',
    prompt: 'A serene river winds its way through a lush green valley, flanked by majestic mountains under a soft, cloudy sky. The landscape is peaceful and untouched.',
    imageUrl: '/Images/a87ed4d74c25528af03277e138a8b531.jpg',
    hint: 'river valley mountains',
    style: 'Photorealistic',
  },
  {
    title: 'Gothic Jungle Temple',
    prompt: 'An ancient, ornate temple with gothic architectural influences is being reclaimed by a dense, vibrant jungle. Sunlight filters through the canopy.',
    imageUrl: '/Images/d86181e00c14354b1712ebd2f4141792.jpg',
    hint: 'jungle temple ancient',
    style: 'Fantasy Art',
  },
  {
    title: 'Enchanted Forest Waterfall',
    prompt: 'A mystical waterfall glows with an ethereal blue light in the heart of an ancient forest, with a stone bridge arching over the magical stream.',
    imageUrl: '/Images/ebe330c0054d4ca2e9550b2f0fc1e326.jpg',
    hint: 'enchanted forest waterfall',
    style: 'Fantasy Art',
  },
  {
    title: 'A World in a Lightbulb',
    prompt: 'A tiny, thriving ecosystem with a curious goldfish is captured inside a classic lightbulb, which sits on a wooden surface, glowing warmly.',
    imageUrl: '/Images/fa5643aaed41c07405d4a8223d1c05d4.jpg',
    hint: 'world lightbulb goldfish',
    style: 'Surrealist',
  },
  {
    title: 'Dragon Over the Sea',
    prompt: 'A magnificent, winged dragon with iridescent scales soars over a calm sea at sunset, its powerful form silhouetted against the golden light.',
    imageUrl: '/Images/fba3519cc7226a3e594290d8eea11c30.jpg',
    hint: 'dragon sea sunset',
    style: 'Fantasy Art',
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
