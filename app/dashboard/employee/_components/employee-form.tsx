'use client';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import axios from "axios";
import {toast} from "sonner";
import {Employee} from "@/constants/data";
import {useRouter} from "next/navigation";
import { useUserDetailsStore, useUserDetailsType } from '@/lib/manager-store';

type EmployeeFormProps = {
    id?: string ;
}

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  lastname: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  job: z.string().min(1, {
    message: 'Company name is required.'
  }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender.'
  })
});

export default function EmployeeForm({id}: EmployeeFormProps) {
  
  const userDetails = useUserDetailsStore(
    (state: unknown) => (state as useUserDetailsType).userDetails
  );

    const router = useRouter();

    const handleGoBack = () => {
        router.back(); // Navigates one step back in history
    };

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
        // @ts-ignore
    defaultValues: async () => {
        if (id === "new") {
            return {
                firstname: '',
                lastname: '',
                email: '',
                job: '',
            }
        } else {

            try{
                const data =  await axios.get('/api/employees')

                const result = data.data.record.filter((el:Employee) => el.id === id)

                const {firstname, lastname, job, gender, email} = result[0] as Employee;

                return {
                    firstname,
                    lastname,
                    email,
                    job,
                    gender
                }
            } catch (e) {
                toast.error('Error getting data, Cannot load employee data');
                handleGoBack();
            }

        }
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
          let response;

          if (id === "new") {
              response = await axios.post('/api/employees', {...values, userId: userDetails.id});
          } else {
              let update = {...values, id:id};
              response = await axios.put(`/api/employees`, update);
          }

          if (response.status === 200) {
              toast.success( id === "new" ?
                  'Employee created successfully.' : "Employee data updated successfully.",
              );

              id === "new" ? form.reset({
                  firstname: '',
                  lastname: '',
                  email: '',
                  job: '',
                  gender: 'male'
              }) : window.location.reload();


          }
      } catch (error) {
          // console.error('Form submission error', error);
          toast.error('Failed to submit the form. Please try again.');
      }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Employee Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your their job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup defaultValue="male"
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
