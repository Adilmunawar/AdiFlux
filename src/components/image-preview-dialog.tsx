
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download, Copy, Sparkles, Loader2, Wand2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { Image as ImageType } from './image-gallery';
import { Badge } from './ui/badge';

interface ImagePreviewDialogProps {
  image: ImageType;
  onClose: () => void;
  onUpscale: (image: ImageType) => void;
  onUsePrompt: (prompt: string, style: string) => void;
}

export function ImagePreviewDialog({ image, onClose, onUpscale, onUsePrompt }: ImagePreviewDialogProps) {
  const { toast } = useToast();
  const [isUpscaling, setIsUpscaling] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `adiflux-${image.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast({
        title: 'Download Failed',
        description: 'Could not download the image. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(image.prompt);
    toast({
      title: 'Prompt Copied!',
      description: 'The prompt has been copied to your clipboard.',
    });
  };
  
  const handleUpscale = async () => {
    setIsUpscaling(true);
    await onUpscale(image);
    setIsUpscaling(false);
    onClose();
  };

  const handleUsePrompt = () => {
    onUsePrompt(image.prompt, image.style);
    onClose();
  };

  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-0 p-0">
        <div className="relative aspect-square w-full">
          <Image src={image.url} alt={image.alt} layout="fill" objectFit="cover" className="rounded-l-lg" />
        </div>
        <div className="flex flex-col p-6">
            <DialogHeader>
                <DialogTitle className="text-2xl mb-2">Image Details</DialogTitle>
                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">Style</Badge>
                    <span className="text-muted-foreground">{image.style}</span>
                </div>
            </DialogHeader>

            <div className="space-y-4 flex-1">
                <p className="text-sm font-medium">Prompt</p>
                <p className="text-muted-foreground bg-muted/50 p-3 rounded-md text-sm leading-relaxed">
                  {image.prompt}
                </p>
            </div>
            
            <DialogFooter className='sm:justify-between flex-col sm:flex-row gap-2 pt-6 mt-auto'>
              <div className='flex gap-2 justify-start'>
                <Button variant="outline" onClick={handleUsePrompt}>
                  <Wand2 className="mr-2 h-4 w-4" /> Use Prompt
                </Button>
                <Button variant="outline" onClick={handleCopyPrompt}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Prompt
                </Button>
              </div>
              <div className="flex gap-2 justify-end">
                <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button onClick={handleUpscale} disabled={isUpscaling}>
                    {isUpscaling ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Upscaling...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Upscale
                        </>
                    )}
                </Button>
              </div>
            </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
