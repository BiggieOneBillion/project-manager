'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
import { storeType, useManagerStore } from '@/lib/manager-store';
import { useProjectData } from '@/hooks/use-project-data';
import { Project } from '@/constants/data';

const formSchema = z.object({
  select_project: z.string()
});

export default function ProjectSelect() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const { data, isLoading } = useProjectData();

  const updateProjectId = useManagerStore(
    (state: unknown) => (state as storeType).setProjectId
  );

  const ProjectId = useManagerStore(
    (state: unknown) => (state as storeType).projectId
  );

  function currentProject(data: Project[], id: string) {
    const result = data?.filter((project: Project) => project.id === id);
    return result[0]?.project_name;
  }

  if (isLoading) {
    return <div className="text-xl font-medium">Loading...</div>;
  }

  return (
    <Form {...form}>
      <form className="mx-auto max-w-3xl space-y-2 py-5">
        <p className="flex items-center font-medium text-white/60">
          Selected Project -{' '}
          <span className="border px-2 py-1 text-lg">
            {currentProject(data, ProjectId)}
          </span>
        </p>

        <FormField
          control={form.control}
          name="select_project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Project from drop down</FormLabel>
              <Select
                onValueChange={(value) => {
                  updateProjectId(value);
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {data.map((project: Project) => {
                    return (
                      <SelectItem key={project.id} value={project.id}>
                        {project.project_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the project you wish to manage
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
