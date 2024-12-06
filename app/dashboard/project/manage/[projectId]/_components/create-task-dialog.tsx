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
import TaskDialogForm from '@/app/dashboard/project/manage/[projectId]/_components/task-dialog-form';
import React from 'react';

type CreateTaskDialogProps = {
  projectId: string;
}

export function CreateTaskDialog({projectId}:CreateTaskDialogProps) {
      const [open, setOpen] = React.useState(false);
      const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}><Plus size={15}/>Add task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Create a new task and assign task to an employee
          </DialogDescription>
        </DialogHeader>
          <TaskDialogForm projectId={projectId} handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
