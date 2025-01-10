'use client';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
import { useEmployeeData } from '@/hooks/use-employee-data';
import { Employee } from '@/constants/data';
import { v4 } from 'uuid';

const formSchema = z.object({
  employee_list: z.string(),
  role: z.string()
});

type selectEmployee = {
  employee: Employee;
  role: string;
};

export default function AddEmployees() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const [selected, setSelected] = useState<selectEmployee[]>([]);

  const { data, isLoading } = useEmployeeData();

  const filterData = (id: string) => {
    const result = data.filter((item: Employee) => item.id === id);
    return result[0];
  };

  if (isLoading) {
    return <div className="text-xl font-medium">Loading...</div>;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSelected([
      ...selected,
      { employee: filterData(values.employee_list), role: values.role }
    ]);
  }

  // async function onUpdateProjectEmployee() {
  //     // const input = sele
  //     try{
  //         await axios.post('/api/project-employee',)
  //     }catch (e) {

  //     }

  // }

  return (
    <section className="mx-auto grid max-w-3xl grid-cols-12 gap-4 space-y-2 py-10">
      <div className="col-span-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-2 py-10"
          >
            <div className="space-y-4">
              <div className="col-span-6y">
                <FormField
                  control={form.control}
                  name="employee_list"
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <section className="col-span-6 flex flex-col justify-between rounded-md bg-slate-800 p-6">
        <ul className="flex flex-col gap-4">
          {selected?.map((employee) => (
            <li
              key={v4()}
              className="flex flex-wrap items-center gap-4 rounded-md bg-slate-900 p-2 text-sm"
            >
              <span>
                Name -{' '}
                {`${employee.employee.firstname} ${employee.employee.lastname}`}
              </span>{' '}
              /<span>Role - {employee.role}</span>
            </li>
          ))}
        </ul>
        {selected.length > 0 && (
          <button className="rounded-md border bg-blue-900 px-2 py-1 text-sm">
            Update Employee List
          </button>
        )}
      </section>
    </section>
  );
}
