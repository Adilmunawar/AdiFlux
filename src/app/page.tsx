'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { PromptForm, type FormValues } from '@/components/prompt-form';
import { ImageGallery, type Image } from '@/components/image-gallery';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (data: FormValues) => {
    setIsLoading(true);
    setImages([]);

    try {
      // Simulate API call for image generation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Create 4 placeholder images
      const newImages: Image[] = Array.from({ length: 4 }).map((_, i) => ({
        id: `img-${Date.now()}-${i}`,
        url: `https://placehold.co/512x512/221a2b/a054ff.png?text=Image+${i + 1}&font=inter`,
        alt: `${data.style} style image of ${data.prompt}`,
        hint: `${data.prompt.split(' ').slice(0, 2).join(' ')} ${data.style}`
      }));

      setImages(newImages);
    } catch (error) {
      toast({
        title: 'Error Generating Images',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 grid md:grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 p-4 md:p-8">
        <aside className="lg:sticky top-20 h-fit flex flex-col gap-6">
          <PromptForm onGenerate={handleGenerate} isLoading={isLoading} />
        </aside>
        <div className="min-w-0">
          <ImageGallery images={images} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
