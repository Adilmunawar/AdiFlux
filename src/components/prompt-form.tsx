
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Wand2, Loader2, Sparkles, Upload, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { upscalePrompt } from '@/ai/flows/upscale-prompt-flow';
import { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from './ui/input';
import { suggestStyle } from '@/ai/flows/suggest-style-prompt';

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: 'Prompt must be at least 10 characters long.',
  }),
  style: z.string({
    required_error: 'Please select an artistic style.',
  }),
  quality: z.string().default('High'),
  upscale: z.boolean().default(false),
});

const editFormSchema = z.object({
  prompt: z.string().min(5, {
    message: 'Prompt must be at least 5 characters long.',
  }),
  image: z.string().min(1, { message: 'Please upload an image.' }),
});


export type FormValues = z.infer<typeof formSchema>;
export type EditFormValues = z.infer<typeof editFormSchema>;

interface PromptFormProps {
  onGenerate: (values: FormValues) => void;
  onEdit: (values: EditFormValues) => void;
  isLoading: boolean;
  prompt: string;
  style: string;
  setPrompt: (prompt: string) => void;
  setStyle: (style: string) => void;
}

const defaultArtisticStyles = [
  'Photorealistic',
  'Surrealist',
  'Pop Art',
  'Minimalist',
  'Cyberpunk',
  'Vintage Photo',
  'Fantasy Art',
  'Abstract',
  'Oil Painting',
  'Watercolor',
];

export function PromptForm({ onGenerate, onEdit, isLoading, prompt, style, setPrompt, setStyle }: PromptFormProps) {
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [artisticStyles, setArtisticStyles] = useState(defaultArtisticStyles);
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      prompt: prompt,
      style: style,
      quality: 'High',
      upscale: false,
    },
  });

  const editForm = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      prompt: '',
      image: '',
    }
  });


  useEffect(() => {
    form.setValue('prompt', prompt);
  }, [prompt, form]);

  useEffect(() => {
    form.setValue('style', style);
  }, [style, form]);

  const handleUpscale = async () => {
    const currentPrompt = form.getValues('prompt');
    if (!currentPrompt) {
      toast({
        title: 'Prompt is empty',
        description: 'Please enter a prompt to upscale.',
        variant: 'destructive',
      });
      return;
    }

    setIsUpscaling(true);
    try {
      const result = await upscalePrompt({ prompt: currentPrompt });
      form.setValue('prompt', result.upscaledPrompt, { shouldValidate: true });
      setPrompt(result.upscaledPrompt);
      toast({ title: 'Prompt Upscaled!', description: 'The prompt has been enhanced with more detail.' });
    } catch (error) {
      toast({
        title: 'Error Upscaling Prompt',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUpscaling(false);
    }
  };

  const handleSuggestStyles = async () => {
    const currentPrompt = form.getValues('prompt');
     if (!currentPrompt) {
      toast({
        title: 'Prompt is empty',
        description: 'Please enter a prompt to suggest styles for.',
        variant: 'destructive',
      });
      return;
    }

    setIsSuggesting(true);
    try {
      const { suggestedStyles } = await suggestStyle({ basePrompt: currentPrompt });
      setArtisticStyles([...new Set([...defaultArtisticStyles, ...suggestedStyles])]);
      toast({ title: 'Styles Suggested!', description: 'New artistic styles have been added to the dropdown.' });
    } catch (error) {
      toast({
        title: 'Error Suggesting Styles',
        description: 'Could not fetch style suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggesting(false);
    }
  };
  
  const onGenerateSubmit = (data: FormValues) => {
    setPrompt(data.prompt);
    setStyle(data.style);
    onGenerate(data);
  };
  
  const onEditSubmit = (data: EditFormValues) => {
    onEdit(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        editForm.setValue('image', dataUri, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Create Your Vision</CardTitle>
        <CardDescription>Describe what you want to see, or upload an image to edit.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="edit">Edit Image</TabsTrigger>
          </TabsList>
          <TabsContent value="generate">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onGenerateSubmit)} className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prompt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A futuristic city skyline at sunset, with flying cars"
                          rows={5}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Artistic Style</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleSuggestStyles}
                          disabled={isSuggesting || isLoading}
                          className="text-primary hover:text-primary/90 -mr-2 h-auto px-2 py-1"
                        >
                           {isSuggesting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Suggesting...
                            </>
                          ) : (
                             <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Suggest
                            </>
                          )}
                        </Button>
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {artisticStyles.map((style) => (
                            <SelectItem key={style} value={style}>
                              {style}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                 <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quality</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select image quality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Ultra">Ultra</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="upscale"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-background/50">
                      <div className="space-y-0.5">
                        <FormLabel>Upscale Image</FormLabel>
                        <FormDescription>
                          Increase image resolution and detail. May take longer.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button type="button" variant="outline" onClick={handleUpscale} disabled={isUpscaling || isLoading} className="flex-1">
                    {isUpscaling ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Upscaling...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Upscale Prompt
                      </>
                    )}
                  </Button>
                  <Button type="submit" disabled={isLoading || isUpscaling || isSuggesting} className="w-full flex-1">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="edit">
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-6 pt-4">
                 <FormField
                  control={editForm.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Image</FormLabel>
                      <FormControl>
                        <div
                          className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-muted-foreground/30 bg-background/50 hover:bg-card/50"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={isLoading}
                          />
                          {imagePreview ? (
                            <Image
                              src={imagePreview}
                              alt="Image preview"
                              fill
                              className="object-contain rounded-lg"
                            />
                          ) : (
                            <div className="text-center text-muted-foreground">
                              <Upload className="mx-auto h-8 w-8" />
                              <p className="mt-2">Click to upload an image</p>
                              <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edit Prompt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Make the sky a vibrant sunset, add a dragon flying"
                          rows={3}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
