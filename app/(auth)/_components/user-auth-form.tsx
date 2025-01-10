'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useUserDetailsStore, useUserDetailsType } from '@/lib/manager-store';
import axios from 'axios';
import { useButtonState } from '@/hooks/use-button-state';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { handleIsSubmitFalse, handleIsSubmitTrue, StateButton } =
    useButtonState();
  const defaultValues = {
    email: 'demo@gmail.com'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema)
  });

  const router = useRouter();

  const setUserDetails = useUserDetailsStore(
    (state: unknown) => (state as useUserDetailsType).setUserDetails
  );

  const onSubmit = async (data: UserFormValue) => {
    handleIsSubmitTrue();
    try {
      const response = await axios.post('/api/auth-custom', {
        email: data.email
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setUserDetails({ email: data.email, id: response.data.data.id });
        setTimeout(() => {
          router.push('/dashboard/create-project');
        }, 1500);
        handleIsSubmitFalse();
      }
    } catch (error) {
      handleIsSubmitFalse();
      toast.error('Try Aagin!');
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
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
      <div className="relative">
        {/*<div className="absolute inset-0 flex items-center">*/}
        {/*  <span className="w-full border-t" />*/}
        {/*</div>*/}
        {/* <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div> */}
      </div>
      {/* <GithubSignInButton /> */}
    </>
  );
}
