'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation'; 

interface ActionProps {
  id: string;
}

export const Action: React.FC<ActionProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const param = useParams()

  const onConfirm = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/task/${id}${param.projectId}`);
      // Invalidate and refetch the 'project' query after a successful mutation
      window.location.reload();
      toast.success('Task deleted from database');
      setLoading(false); // stop the loading spinner
      setOpen(false); // close the alert box
    } catch (error) {
      toast.error('Failed to delete task, Try again later');
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="ml-auto h-8 w-8 pr-8 hover:bg-transparent"
          >
            <span className="sr-only">Open menu</span>
            <Badge variant={'outline'} className="ml-auto font-semibold">
              Actions
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push(`/dashboard/project/manage/edit-task/${id}${param.projectId}`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
