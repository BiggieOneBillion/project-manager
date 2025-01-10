'use client';
import { toast } from 'sonner';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEmployeeData } from '@/hooks/use-employee-data';
import { Employee } from '@/constants/data';
import axios from 'axios';
import { v4 } from 'uuid';
import { useButtonState } from '@/hooks/use-button-state';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(1),
  status: z.string(),
  description: z.string().min(1),
  employee: z.string().min(1)
});

export interface IinitialValues {
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  employees: string[];
  id: string;
  project_id: string;
  status: string;
  title: string;
  updated: string;
}

type TaskDialogFormProps = {
  taskId: string;
  initialValues: IinitialValues;
  projectId: string;
};

export default function EditTaskForm({
  taskId,
  initialValues,
  projectId
}: TaskDialogFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues.title,
      status: initialValues.status,
      description: initialValues.description,
      employee: initialValues.employees[0]
    }
  });

  const router = useRouter();

  const { data, isLoading } = useEmployeeData();

  const { handleIsSubmitFalse, handleIsSubmitTrue, StateButton } =
    useButtonState();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    handleIsSubmitTrue();
    try {
      const response = await axios.put('/api/task', {
        ...values,
        id: taskId,
        project_id: projectId
      });

      if (response.status === 200) {
        toast.success('Task Updated successfully created!');
        handleIsSubmitFalse();
      }

      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      handleIsSubmitFalse();
      // console.error("Form submission error", error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  if (isLoading) {
    return <div className="text-xl font-medium">Loading...</div>;
  }

  return (
    <section className="space-y-6 p-4 md:p-10">
      <h1 className="text-xl font-semibold">Edit Task Form</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-autoy z-[10000] w-full space-y-8  md:max-w-3xl"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" type="text" {...field} />
                </FormControl>
                <FormDescription>Title of the task</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the task"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>What the task is about.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* status and assign */}
          <div className="gap-4 md:grid md:grid-cols-12">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TODO">TODO</SelectItem>
                        <SelectItem value="IN-PROGRESS">IN-PROGRESS</SelectItem>
                        <SelectItem value="IN-REVIEW">IN-REVIEW</SelectItem>
                        <SelectItem value="DONE">DONE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      status: To-do, In-progress, Done
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="employee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign Employee</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((employee: Employee) => {
                          let value = `${employee.firstname} ${employee.lastname}`;
                          return (
                            <SelectItem key={v4()} value={employee.id}>
                              {value}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Assign employee to the task
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* submit button */}
          <div className="flex justify-end">
            <StateButton />
          </div>
        </form>
      </Form>
    </section>
  );
}
