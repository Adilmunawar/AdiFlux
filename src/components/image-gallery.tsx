
'use client';

import Image from 'next/image';
import { Download, Image as ImageIcon, Copy, Expand, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { ImagePreviewDialog } from './image-preview-dialog';

export interface Image {
  id: string;
  url: string;
  alt: string;
  hint: string;
  prompt: string;
  style: string;
}

interface ImageGalleryProps {
  images: Image[];
  isLoading: boolean;
  onUpscale: (image: Image) => void;
  onUsePrompt: (prompt: string, style: string) => void;
}

function ImageCard({ image, index, onSelect }: { image: Image; index: number; onSelect: (image: Image) => void; }) {
  return (
    <Card 
      className="overflow-hidden group relative border-2 border-transparent hover:border-primary transition-all duration-300 bg-card/50 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
    >
      <CardContent className="p-0">
        <Image
          src={image.url}
          alt={image.alt}
          width={512}
          height={512}
          className="aspect-square object-cover w-full transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          data-ai-hint={image.hint}
          onClick={() => onSelect(image)}
        />
        <div 
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4"
          onClick={() => onSelect(image)}
        >
            <Button
              variant="secondary"
              size="icon"
              aria-label="Preview image"
              className="bg-background/50 hover:bg-background/80 text-foreground scale-90 group-hover:scale-100 transition-transform duration-300"
            >
              <Expand className="h-5 w-5" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SkeletonCard({ index }: { index: number }) {
    return (
      <Card 
        className="overflow-hidden bg-card/50 animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
      >
        <CardContent className="p-0">
          <div className="aspect-square w-full bg-muted/50 animate-pulse" />
        </CardContent>
      </Card>
    );
  }

export function ImageGallery({ images, isLoading, onUpscale, onUsePrompt }: ImageGalleryProps) {
    const showEmptyState = !isLoading && images.length === 0;
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    return (
      <div>
        {showEmptyState ? (
           <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 h-full min-h-[400px] text-center p-8 bg-card/30">
              <div className="bg-muted/50 rounded-full p-4">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold">Your creations will appear here</h2>
              <p className="mt-2 text-muted-foreground">
              Enter a prompt and select a style to start generating images.
              </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} index={index} />)
            ) : (
              images.map((image, index) => (
                <ImageCard key={image.id} image={image} index={index} onSelect={setSelectedImage} />
              ))
            )}
          </div>
        )}
        {selectedImage && (
            <ImagePreviewDialog 
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
                onUpscale={onUpscale}
                onUsePrompt={onUsePrompt}
            />
        )}
      </div>
    );
  }
