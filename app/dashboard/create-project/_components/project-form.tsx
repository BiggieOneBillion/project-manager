'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import axios from 'axios';
import { useUserDetailsStore, useUserDetailsType } from '@/lib/manager-store';
import { useButtonState } from '@/hooks/use-button-state';

export const categoryData = [
  {
    label: 'Construction',
    value: 'Construction'
  },
  {
    label: 'IT',
    value: 'IT'
  },
  {
    label: 'Medicine',
    value: 'Medicine'
  },
  {
    label: 'Event Planning',
    value: 'Event Planning'
  },
];

const formSchema = z.object({
  project_name: z.string().min(1),
  project_description: z.string().min(1),
  kick_off_date: z.coerce.date(),
  end_date: z.coerce.date(),
  // team_members: z.array(z.string()).nonempty("Please at least one item"),
  project_category: z.string()
});

export default function ProjectForm() {

  const {handleIsSubmitFalse, handleIsSubmitTrue, StateButton} = useButtonState()
 
  const userDetails = useUserDetailsStore(
    (state: unknown) => (state as useUserDetailsType).userDetails
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kick_off_date: new Date(),
      end_date: new Date()
      // "team_members": []
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
     handleIsSubmitTrue()
    try {
      const response = await axios.post('/api/project', {...values, userId: userDetails.id})
      
      if (response.status === 200) {
        toast.success(
          'Project created successfully.',
        );
        form.reset({
            project_name: "",
            project_description: "",
            kick_off_date: new Date(),
            end_date: new Date(),
            project_category: "",
        });
      }
      handleIsSubmitFalse()
    } catch (error) {
      handleIsSubmitFalse()
      // console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-autoy max-w-xl space-y-8 py-10"
      >
        <FormField
          control={form.control}
          name="project_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="project name" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe what your project is all about
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="project_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    categoryData.map((item,i) => (
                       <SelectItem key={i} value={item.label}>{item.value}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormDescription>
                Project type e.g IT, Construction e.t.c
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="kick_off_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel> Kick-off date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Project start date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Proposed project completion date.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* <FormField
              control={form.control}
              name="team_members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add team members</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-xs"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select team" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                      <MultiSelectorList>
                        <MultiSelectorItem value={"React"}>React</MultiSelectorItem>
                        <MultiSelectorItem value={"Vue"}>Vue</MultiSelectorItem>
                        <MultiSelectorItem value={"Svelte"}>Svelte</MultiSelectorItem>
                      </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormDescription>Select employee for this project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
        <StateButton />
      </form>
    </Form>
  );
}
