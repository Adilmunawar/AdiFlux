
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { PromptForm, type FormValues } from '@/components/prompt-form';
import { ImageGallery, type Image } from '@/components/image-gallery';
import { useToast } from '@/hooks/use-toast';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { ExplorePrompts } from '@/components/explore-prompts';
import { upscaleImage } from '@/ai/flows/upscale-image-flow';
import { editImage } from '@/ai/flows/edit-image-flow';

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Photorealistic');

  const handleGenerate = async (data: FormValues) => {
    setIsLoading(true);
    setImages([]); // Clear previous images

    try {
      const imagePromises = Array.from({ length: 4 }).map(() => generateImage(data));
      const results = await Promise.allSettled(imagePromises);

      const newImages: Image[] = [];
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.imageUrl) {
          newImages.push({
            id: `img-${Date.now()}-${index}`,
            url: result.value.imageUrl,
            prompt: data.prompt,
            style: data.style,
            alt: `${data.style} style image of ${data.prompt}`,
            hint: `${data.prompt.split(' ').slice(0, 2).join(' ')} ${data.style}`
          });
        } else {
           const errorMessage = result.status === 'rejected' ? (result.reason as Error).message : 'An unknown error occurred.';
          toast({
            title: 'Error Generating Image',
            description: `An error occurred while generating one of the images: ${errorMessage}`,
            variant: 'destructive',
          });
        }
      });
      
      setImages(newImages);

    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : String(error);
      toast({
        title: 'Error Generating Images',
        description: `Something went wrong. Please try again. ${errorMessage}`,
        variant: 'destructive',
      });
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEdit = async (data: { prompt: string; image: string }) => {
    setIsLoading(true);
    setImages([]);

    try {
      const imagePromises = Array.from({ length: 4 }).map(() => editImage({
        prompt: data.prompt,
        image: data.image,
      }));
      const results = await Promise.allSettled(imagePromises);

      const newImages: Image[] = [];
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.imageUrl) {
          newImages.push({
            id: `edit-${Date.now()}-${index}`,
            url: result.value.imageUrl,
            prompt: data.prompt,
            style: 'Edited',
            alt: `Edited image based on prompt: ${data.prompt}`,
            hint: `edited ${data.prompt.split(' ').slice(0, 2).join(' ')}`
          });
        } else {
          const errorMessage = result.status === 'rejected' ? (result.reason as Error).message : 'An unknown error occurred.';
          toast({
            title: 'Error Editing Image',
            description: `An error occurred while editing one of the images: ${errorMessage}`,
            variant: 'destructive',
          });
        }
      });
      
      setImages(newImages);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast({
        title: 'Error Editing Images',
        description: `Something went wrong. Please try again. ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUsePrompt = (prompt: string, style?: string) => {
    setPrompt(prompt);
    if(style) setStyle(style);
  };
  
  const handleUpscale = async (image: Image) => {
    try {
      toast({ title: 'Upscaling Image...', description: 'Please wait while we enhance your image.' });
      const { imageUrl } = await upscaleImage({ imageUrl: image.url });
      const upscaledImage: Image = {
        ...image,
        id: `upscaled-${Date.now()}`,
        url: imageUrl,
        alt: `Upscaled: ${image.alt}`,
      };
      setImages(prevImages => [upscaledImage, ...prevImages.filter(img => img.id !== image.id)]);
      toast({ title: 'Image Upscaled!', description: 'Your enhanced image has been added to the gallery.' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast({
        title: 'Error Upscaling Image',
        description: `Something went wrong. Please try again. ${errorMessage}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 grid md:grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 p-4 md:p-8">
        <aside className="lg:sticky top-20 h-fit flex flex-col gap-6">
          <PromptForm 
            onGenerate={handleGenerate} 
            onEdit={handleEdit}
            isLoading={isLoading} 
            prompt={prompt} 
            style={style}
            setPrompt={setPrompt}
            setStyle={setStyle}
          />
        </aside>
        <div className="min-w-0">
          <ImageGallery 
            images={images} 
            isLoading={isLoading} 
            onUpscale={handleUpscale} 
            onUsePrompt={handleUsePrompt} 
          />
          <ExplorePrompts onUsePrompt={handleUsePrompt} />
        </div>
      </main>
    </div>
  );
}
