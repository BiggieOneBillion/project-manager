"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';

import { EmployeeAvatar } from '@/app/dashboard/project/manage/[projectId]/_components/employee-avatar';
import { v4 } from 'uuid';
import { ITaskDataType } from '@/types/data';
import { Action } from './actions';

// export interface Task {
//   id: UniqueIdentifier;
//   columnId: ColumnId;
//   content: string;
// }

interface TaskCardProps {
  task: ITaskDataType;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Partial<ITaskDataType>;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task'
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary'
      }
    }
  });

  // @ts-ignore
  // @ts-ignore
  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
      })}
    >
      <CardHeader className="space-between relative flex flex-row border-b-2 border-secondary px-3 py-3">
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <Action id={task.id}/>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap px-3 pb-6 pt-3 text-left">
        <div className="flex items-center justify-between">
          <div className='flex flex-col gap-1'>
          <span className='text-sm capitalize max-w-[200px]'>
             {task.title}
          </span>
          <hr />
          <span className='text-slate-400 text-xs capitalize max-w-[200px]'>
            {task.description}
          </span>
          </div>
          <ul className="flex items-center gap-1">
            {
              task.employees.map((employee:string) => <EmployeeAvatar employeeId={employee} key={v4()}  />) // provide type
            }
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
