import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useTaskData } from '@/hooks/use-task-data';
import axios from 'axios';
import { useButtonState } from '@/hooks/use-button-state';
import { useRevalidateQuery } from '@/hooks/use-revalidate-query';

const formSchema = z.object({
  project_status: z.string()
});

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  taskId: string;
  projectId: string;
};

export function StatusUpdate({ isOpen, setIsOpen, taskId, projectId }: Props) {
  const { isLoading, data } = useTaskData(projectId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const revalidate = useRevalidateQuery('task');

  const { handleIsSubmitFalse, handleIsSubmitTrue, StateButton } =
    useButtonState();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-black px-2 py-3 text-white dark:bg-white dark:text-black">
          <p>...Loading</p>
        </div>
      </div>
    );
  }

  const task = data.find((task: any) => task.id === taskId);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (task.status === values.project_status) return;
    handleIsSubmitTrue();
    try {
      const response = await axios.put('/api/task', {
        ...task,
        id: taskId,
        project_id: projectId,
        status: values.project_status
      });

      if (response.status === 200) {
        toast.success('Task Updated successfully created!');
        handleIsSubmitFalse();
      }
      revalidate();
      // router.back();
    } catch (error) {
      handleIsSubmitFalse();
      // console.error("Form submission error", error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto max-w-3xl space-y-8 py-10"
            >
              <FormField
                control={form.control}
                name="project_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={task.status}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TODO">TODO</SelectItem>
                        <SelectItem value="IN-PROGRESS">IN-PROGRESS</SelectItem>
                        <SelectItem value="IN-REVIEW">IN-REVIEW</SelectItem>
                        <SelectItem value="DONE">DONE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <StateButton />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
