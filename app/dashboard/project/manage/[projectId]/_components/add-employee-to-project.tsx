'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import React from 'react';
import AddEmployeesToProjectForm from '@/app/dashboard/project/manage/[projectId]/_components/add-employee-to-project-form';
import { useEmployeeData } from '@/hooks/use-employee-data';
import { useRouter } from 'next/navigation';

type CreateTaskDialogProps = {
  projectId: string;
};

export function AddEmployeeDialog({ projectId }: CreateTaskDialogProps) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const { data, isLoading } = useEmployeeData();
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
          <Plus size={15} />
          Add Employee To Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Employee To Project</DialogTitle>
          <DialogDescription>
            Create a new task and assign task to an employee
          </DialogDescription>
        </DialogHeader>

        {data && data.length > 0 ? (
          <AddEmployeesToProjectForm
            projectId={projectId}
            handleClose={handleClose}
          />
        ) : (
          <section className="space-y-3">
            <p className="text-lg font-semibold text-black dark:text-white">
              You have not added any employees yet.
            </p>
            <button
              className="rounded-md border px-3 py-1 dark:border-white"
              onClick={() => router.push('/dashboard/employee/new')}
            >
              click to create employee
            </button>
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
}
