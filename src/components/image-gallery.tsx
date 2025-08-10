'use client';

import Image from 'next/image';
import { Download, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export interface Image {
  id: string;
  url: string;
  alt: string;
  hint: string;
}

interface ImageGalleryProps {
  images: Image[];
  isLoading: boolean;
}

function ImageCard({ image }: { image: Image }) {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `imagi-ai-${image.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast({
        title: 'Download Started',
        description: 'Your image is being downloaded.',
      });
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Could not download the image. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="overflow-hidden group relative border-2 border-transparent hover:border-primary transition-all duration-300">
      <CardContent className="p-0">
        <Image
          src={image.url}
          alt={image.alt}
          width={512}
          height={512}
          className="aspect-square object-cover w-full transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={image.hint}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleDownload}
            aria-label="Download image"
            className="bg-primary/80 hover:bg-primary text-primary-foreground scale-90 group-hover:scale-100 transition-transform duration-300"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonCard() {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-square w-full bg-muted animate-pulse" />
        </CardContent>
      </Card>
    );
  }

export function ImageGallery({ images, isLoading }: ImageGalleryProps) {
  const showEmptyState = !isLoading && images.length === 0;

  return (
    <div>
      {showEmptyState ? (
         <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 h-full min-h-[400px] text-center p-8">
            <div className="bg-muted rounded-full p-4">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Your creations appear here</h2>
            <p className="mt-2 text-muted-foreground">
            Enter a prompt and select a style to start generating images with AI.
            </p>
        </div>
      ) : (
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-500', 
            isLoading && images.length === 0 ? 'opacity-0' : 'opacity-100'
        )}>
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
          {isLoading && Array.from({ length: Math.max(0, 4 - images.length) }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
}
