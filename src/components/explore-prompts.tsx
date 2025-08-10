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
    prompt: 'A breathtaking waterfall cascades into a luminous, subterranean cavern, surrounded by glowing crystals and mystical flora, creating an otherworldly, magical atmosphere.',
    imageUrl: '/Images/099f45ecfb8bc5b9be5fde9e8c66ef23.jpg',
    hint: 'glowing waterfall cavern',
  },
  {
    title: 'Serenity at Golden Lake',
    prompt: 'A tranquil lake glows under the golden hour, surrounded by lush trees and distant mountains, reflecting the warm sunset.',
    imageUrl: '/Images/0d70bae9ebd1b814092d0ce81af69873.jpg',
    hint: 'golden lake sunset',
  },
  {
    title: 'City in a Globe',
    prompt: 'A miniature, detailed city with towering skyscrapers and intricate highways is encased within a glass globe, held by a majestic stand.',
    imageUrl: '/Images/1f14f87cad85c101c1097b5d13994abb.jpg',
    hint: 'city globe miniature',
  },
  {
    title: 'Planetfall',
    prompt: 'A vibrant, ringed planet with swirling blue and green continents hangs in a star-dusted cosmos, a beautiful and awe-inspiring celestial body.',
    imageUrl: '/Images/1f934ed53a62c8d8974ad629256be26a.jpg',
    hint: 'vibrant planet cosmos',
  },
  {
    title: 'Panda in Pajamas',
    prompt: 'A cute, fluffy panda wearing cozy blue star-patterned pajamas sits in a warmly lit bedroom, ready for a bedtime story.',
    imageUrl: '/Images/2ce04b936820c857d744bb104acc8fcd.jpg',
    hint: 'cute panda pajamas',
  },
  {
    title: 'Miniature City Coffee',
    prompt: 'A detailed miniature city skyline, bustling with life, emerges from the top of a coffee cup held over a city street at sunset.',
    imageUrl: '/Images/36c98b4864e64efca8809578419657c1.jpg',
    hint: 'miniature city coffee',
  },
  {
    title: 'Canyon Citadel',
    prompt: 'A magnificent, ancient citadel is carved into the cliffs of a vast desert canyon, illuminated by the warm glow of a setting sun.',
    imageUrl: '/Images/52964ffddcd0fe602abc4f667b3c2a57.jpg',
    hint: 'canyon citadel desert',
  },
  {
    title: 'Glacial Island',
    prompt: 'A colossal glacier with sheer ice cliffs rises from a calm, reflective sea, its immense scale creating a sense of tranquil power.',
    imageUrl: '/Images/6de49728e6fa60ca59df98f5fde8b330.jpg',
    hint: 'glacial island sea',
  },
  {
    title: 'Eco-Friendly Workspace',
    prompt: 'A modern laptop sits open on a desk, its screen displaying a lush, green forest that seems to grow out of the keyboard, blending technology with nature.',
    imageUrl: '/Images/7a628adce35d56c4060c27444577d808.jpg',
    hint: 'eco laptop nature',
  },
  {
    title: 'Crystalline Wave',
    prompt: 'An enormous, beautifully detailed wave made of shimmering, translucent crystal is frozen in motion, its surface catching the light.',
    imageUrl: '/Images/9de02dd62431f4091bb31fb1d31072f0.jpg',
    hint: 'crystal wave ocean',
  },
  {
    title: 'Sky Temple Pathway',
    prompt: 'An ancient stone pathway leads to a magnificent temple perched high in the mountains, surrounded by serene waters and floating lotus flowers.',
    imageUrl: '/Images/a87ed4d74c25528af03277e138a8b531.jpg',
    hint: 'sky temple mountains',
  },
  {
    title: 'Cathedral of Nature',
    prompt: 'Sunlight streams through the grand arches of a colossal, ancient ruin that has been reclaimed by a lush forest, creating a cathedral of nature.',
    imageUrl: '/Images/d86181e00c14354b1712ebd2f4141792.jpg',
    hint: 'nature cathedral ruins',
  },
  {
    title: 'Enchanted River Bridge',
    prompt: 'A mystical stone bridge crosses a glowing, bioluminescent river in an enchanted forest at twilight, with magical flora lighting the path.',
    imageUrl: '/Images/ebe330c0054d4ca2e9550b2f0fc1e326.jpg',
    hint: 'enchanted bridge river',
  },
  {
    title: 'Goldfish in a Lightbulb',
    prompt: 'A tiny goldfish swims peacefully inside a clear lightbulb terrarium, which rests on a wooden surface, a surreal and whimsical concept.',
    imageUrl: '/Images/fa5643aaed41c07405d4a8223d1c05d4.jpg',
    hint: 'goldfish lightbulb surreal',
  },
  {
    title: 'Dragon Over the Sea',
    prompt: 'A magnificent, winged dragon with iridescent scales soars over a calm sea at sunset, its powerful form silhouetted against the golden sky.',
    imageUrl: '/Images/fba3519cc7226a3e594290d8eea11c30.jpg',
    hint: 'dragon sunset sea',
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
