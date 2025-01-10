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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useEmployeeData } from '@/hooks/use-employee-data';
import { Employee } from '@/constants/data';
import axios from 'axios';
import { useButtonState } from '@/hooks/use-button-state';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  employeeId: z.string(),
  role: z.string()
});

export default function AddEmployeesToProjectForm({
  projectId,
  handleClose
}: {
  projectId: string;
  handleClose: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const router = useRouter();

  const { data, isLoading } = useEmployeeData();
  // const {data: ProjectData, isLoading: isProjectDataLoading} = useProjectData();

  const { handleIsSubmitFalse, handleIsSubmitTrue, StateButton } =
    useButtonState();

  if (isLoading) {
    return <div className="text-xl font-medium">Loading...</div>;
  }

  if (data && data.length === 0) {
    toast.error('YOU HAVE NO EMPLOYEE!!, ADD EMPLOYEE FIRST');
    router.push('/dashboard/employee/new');
    return;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    handleIsSubmitTrue();
    try {
      const response = await axios.post('/api/project-employee', {
        ...values,
        project_id: projectId
      });
      if (response.status === 200) {
        toast.success('Employee added successfully.');
        handleIsSubmitFalse();
      }

      handleClose();
      window.location.reload();
    } catch (e) {
      handleIsSubmitFalse();
      toast.error('Employee Already Exist On Project');
      // // console.log(e);
    }
  }

  // const project = ProjectData?.filter((item:Project) => item.id === projectId);
  // const projectEmployeeList = project[0].employee_list
  // const displayedList = data?.map((item:(Employee & {projects: string[]})) => {
  //      let isPresent = item.projects.map(item => {
  //           let isReallyPresent = projectEmployeeList.find((projectEmployeeId:string) => projectEmployeeId === item)
  //           if (isReallyPresent) {
  //             return null
  //           }
  //           return item
  //      }).filter( x => x !== null)
  //
  //
  // })

  return (
    <section className=" mx-autoy max-w-3xl space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-3xl space-y-2 py-10"
        >
          <div className="space-y-4">
            <div className="col-span-6y">
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employees List</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose Employee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((employee: Employee) => (
                          <SelectItem
                            key={employee.id}
                            value={employee.id}
                          >{`${employee.firstname} ${employee.lastname}`}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select employees you want on the project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6y">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role in the project</FormLabel>
                    <FormControl>
                      <Input placeholder="assigned role" type="" {...field} />
                    </FormControl>
                    <FormDescription>
                      The assigned role on the project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <StateButton />
        </form>
      </Form>
    </section>
  );
}
