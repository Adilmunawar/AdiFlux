'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { PromptForm, type FormValues } from '@/components/prompt-form';
import { ImageGallery, type Image } from '@/components/image-gallery';
import { useToast } from '@/hooks/use-toast';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { ExplorePrompts } from '@/components/explore-prompts';

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Photorealistic');

  const handleGenerate = async (data: FormValues) => {
    setIsLoading(true);
    const placeholderImages: Image[] = Array.from({ length: 4 }).map((_, i) => ({
      id: `placeholder-${i}`,
      url: '',
      alt: 'loading image',
      hint: '',
    }));
    setImages(placeholderImages);

    try {
      const imagePromises = Array.from({ length: 4 }).map(() => generateImage(data));

      const results = await Promise.allSettled(imagePromises);

      const newImages: Image[] = [];
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.imageUrl) {
          newImages.push({
            id: `img-${Date.now()}-${index}`,
            url: result.value.imageUrl,
            alt: `${data.style} style image of ${data.prompt}`,
            hint: `${data.prompt.split(' ').slice(0, 2).join(' ')} ${data.style}`
          });
        } else {
          toast({
            title: 'Error Generating Image',
            description: `An error occurred while generating one of the images.`,
            variant: 'destructive',
          });
        }
      });
      
      setImages(prevImages => {
        const updatedImages = [...prevImages.filter(img => img.url)];
        return [...updatedImages, ...newImages].slice(0, 4);
      });

    } catch (error) {
      toast({
        title: 'Error Generating Images',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUsePrompt = (prompt: string) => {
    setPrompt(prompt);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 grid md:grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 p-4 md:p-8">
        <aside className="lg:sticky top-20 h-fit flex flex-col gap-6">
          <PromptForm 
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
            prompt={prompt} 
            style={style}
            setPrompt={setPrompt}
            setStyle={setStyle}
          />
        </aside>
        <div className="min-w-0">
          <ImageGallery images={images} isLoading={isLoading} />
          <ExplorePrompts onUsePrompt={handleUsePrompt} />
        </div>
      </main>
    </div>
  );
}
