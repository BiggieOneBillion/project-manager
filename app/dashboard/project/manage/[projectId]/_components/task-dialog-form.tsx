"use client"


import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"




import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Textarea
} from "@/components/ui/textarea"








import { useEmployeeData } from '@/hooks/use-employee-data';
import { Employee } from '@/constants/data';
import axios from 'axios';
import { v4 } from 'uuid';
import { useButtonState } from "@/hooks/use-button-state"



const formSchema = z.object({
  title: z.string().min(1),
  status: z.string(),
  description: z.string().min(1),
  employee: z.string().min(1),
});

type TaskDialogFormProps = {   projectId: string;   handleClose: () => void; }

export default function TaskDialogForm({projectId, handleClose}: TaskDialogFormProps) {

  const {handleIsSubmitFalse, handleIsSubmitTrue, StateButton} = useButtonState()

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
  })

  const {data, isLoading} = useEmployeeData();

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    handleIsSubmitTrue()
    try {
      const response = await axios.post('/api/task', {...values, id: projectId})
      form.reset({
        title:"",
        description: "",
      });
      if (response.status === 200) {
      toast.success('Task successfully created!')
      }
      handleClose();
      handleIsSubmitFalse()
      window.location.reload();
    } catch (error) {
      handleIsSubmitFalse()
      // console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  if (isLoading) {
    return <div className="text-xl font-medium">Loading...</div>
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-autoy  z-[10000]">

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter title"

                  type="text"
                  {...field} />
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
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                  }} defaultValue={field.value}>
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
                  <FormDescription>status: To-do, In-progress, Done</FormDescription>
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
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                  }} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((employee: Employee) => {
                        let value = `${employee.firstname} ${employee.lastname}`
                        return (
                          <SelectItem key={v4()} value={employee.id}>{value}</SelectItem>
                          // <SelectItem key={v4()} value={"sam used"}>{`${employee.firstname} ${employee.lastname}`}</SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription>Assign employee to the task</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          </div>
        {/* start date and end date*/}
        {/*<div className="grid grid-cols-12 gap-4">*/}
        {/*  <div className="col-span-6 relative z-[10000]">*/}
        {/*    <FormField*/}
        {/*      control={form.control}*/}
        {/*      name="start_date"*/}
        {/*      render={({ field }) => (*/}
        {/*        <FormItem className="flex flex-col">*/}
        {/*          <FormLabel>Start Date</FormLabel>*/}
        {/*          <Popover>*/}
        {/*            <PopoverTrigger asChild>*/}
        {/*              <FormControl>*/}
        {/*                <Button*/}
        {/*                  variant={'outline'}*/}
        {/*                  className={cn(*/}
        {/*                    'w-[240px]  lg:w-full pl-3 text-left font-normal',*/}
        {/*                    !field.value && 'text-muted-foreground'*/}
        {/*                  )}*/}
        {/*                >*/}
        {/*                  {field.value ? (*/}
        {/*                    format(field.value, 'PPP')*/}
        {/*                  ) : (*/}
        {/*                    <span>Pick a date</span>*/}
        {/*                  )}*/}
        {/*                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />*/}
        {/*                </Button>*/}
        {/*              </FormControl>*/}
        {/*            </PopoverTrigger>*/}
        {/*            <PopoverContent className="w-auto p-0 relative z-[10000]" align="start">*/}
        {/*              <Calendar*/}

        {/*                mode="single"*/}
        {/*                selected={field.value}*/}
        {/*                onSelect={(value) => {*/}
        {/*                  alert(value)*/}
        {/*                  field.onChange(value);*/}
        {/*                }}*/}
        {/*                initialFocus*/}
        {/*              />*/}
        {/*            </PopoverContent>*/}
        {/*          </Popover>*/}
        {/*          <FormDescription>When you want to start the task</FormDescription>*/}
        {/*          <FormMessage />*/}
        {/*        </FormItem>*/}
        {/*      )}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className="col-span-6">*/}
        {/*    <FormField*/}
        {/*      control={form.control}*/}
        {/*      name="end_date"*/}
        {/*      render={({ field }) => (*/}
        {/*        <FormItem className="flex flex-col">*/}
        {/*          <FormLabel>End Date</FormLabel>*/}
        {/*          <Popover>*/}
        {/*            <PopoverTrigger asChild>*/}
        {/*              <FormControl>*/}
        {/*                <Button*/}
        {/*                  variant={'outline'}*/}
        {/*                  className={cn(*/}
        {/*                    'w-[240px] lg:w-full pl-3 text-left font-normal',*/}
        {/*                    !field.value && 'text-muted-foreground'*/}
        {/*                  )}*/}
        {/*                >*/}
        {/*                  {field.value ? (*/}
        {/*                    format(field.value, 'PPP')*/}
        {/*                  ) : (*/}
        {/*                    <span>Pick a date</span>*/}
        {/*                  )}*/}
        {/*                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />*/}
        {/*                </Button>*/}
        {/*              </FormControl>*/}
        {/*            </PopoverTrigger>*/}
        {/*            <PopoverContent className="w-auto p-0" align="start">*/}
        {/*              <Calendar*/}
        {/*                mode="single"*/}
        {/*                selected={field.value}*/}
        {/*                onSelect={field.onChange}*/}
        {/*                initialFocus*/}
        {/*              />*/}
        {/*            </PopoverContent>*/}
        {/*          </Popover>*/}
        {/*          <FormDescription>Task proposed end date</FormDescription>*/}
        {/*          <FormMessage />*/}
        {/*        </FormItem>*/}
        {/*      )}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* submit button */}
        <div className="flex justify-end">
         <StateButton />
        </div>
      </form>
    </Form>
)
}