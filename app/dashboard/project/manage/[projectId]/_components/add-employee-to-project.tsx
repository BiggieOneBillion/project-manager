"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react';
import React from 'react';
import AddEmployeesToProjectForm
  from '@/app/dashboard/project/manage/[projectId]/_components/add-employee-to-project-form';

type CreateTaskDialogProps = {
  projectId: string;
}

export function AddEmployeeDialog({projectId}:CreateTaskDialogProps) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}><Plus size={15}/>Add Employee To Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Employee To Project</DialogTitle>
          <DialogDescription>
            Create a new task and assign task to an employee
          </DialogDescription>
        </DialogHeader>
        <AddEmployeesToProjectForm projectId={projectId} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}