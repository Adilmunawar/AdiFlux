'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Wand2, Loader2, Sparkles } from 'lucide-react';

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
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

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

export type FormValues = z.infer<typeof formSchema>;

interface PromptFormProps {
  onGenerate: (values: FormValues) => void;
  isLoading: boolean;
  prompt: string;
  style: string;
  setPrompt: (prompt: string) => void;
  setStyle: (style: string) => void;
}

const artisticStyles = [
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

export function PromptForm({ onGenerate, isLoading, prompt, style, setPrompt, setStyle }: PromptFormProps) {
  const [isUpscaling, setIsUpscaling] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      prompt: prompt,
      style: style,
      quality: 'High',
      upscale: false,
    },
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
  
  const onSubmit = (data: FormValues) => {
    setPrompt(data.prompt);
    setStyle(data.style);
    onGenerate(data);
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Create Your Vision</CardTitle>
        <CardDescription>Describe what you want to see and select an artistic style.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormLabel>Artistic Style</FormLabel>
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
              <Button type="submit" disabled={isLoading || isUpscaling} className="w-full flex-1">
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
      </CardContent>
    </Card>
  );
}
