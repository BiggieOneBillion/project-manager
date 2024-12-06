'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Product2 } from '@/constants/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import SelectDate from './select-date';
import { categoryData } from '@/app/dashboard/create-project/_components/project-form';
import { toast } from 'sonner';
import axios from 'axios';
import {useRevalidateQuery} from "@/hooks/use-revalidate-query";
import { useUserDetailsStore, useUserDetailsType } from '@/lib/manager-store';
import { useButtonState } from '@/hooks/use-button-state';

const formSchema = z.object({
  project_name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  category: z.string(),
  end_date: z.coerce.date(),
  kick_off_date: z.coerce.date(),
  project_description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
});



export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product2 | null;
  pageTitle: string;
}) {

  const revalidateQuery = useRevalidateQuery('projects');

  const userDetails = useUserDetailsStore(
    (state: unknown) => (state as useUserDetailsType).userDetails
  );

  

  const default_start_date = new Date(initialData?.kick_off_date || '');
  const default_end_date = new Date(initialData?.end_date || '');
  const defaultValues = {
    project_name: initialData?.project_name || '',
    category: initialData?.category || '',
    project_description: initialData?.project_description || '',
    end_date: default_start_date,
    kick_off_date: default_end_date
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const {handleIsSubmitFalse, handleIsSubmitTrue, StateButton} = useButtonState()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    handleIsSubmitTrue()
    try {
      const data = { ...values, id: initialData?.id, userId:userDetails.id }; // add id to the data
      const response = await axios.put('/api/project', data);
      if (response.status === 200) {
        toast('Successfully updated project');
        await revalidateQuery();
        handleIsSubmitFalse()
      }
    } catch (error) {
      handleIsSubmitFalse()
      // console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="project_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value[field.value.length - 1]}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={initialData?.category}
                            placeholder={initialData?.category}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryData.map((item, i) => (
                          <SelectItem key={i} value={item.label}>
                            {item.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SelectDate form={form} inputType="end_date" />
              <SelectDate form={form} inputType="kick_off_date" />
            </div>
            <FormField
              control={form.control}
              name="project_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <StateButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
