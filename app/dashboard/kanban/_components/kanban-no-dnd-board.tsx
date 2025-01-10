'use client';
import React, { useEffect } from 'react';
import { BoardColumn, Column } from './board-column';
import { useTaskStore } from '@/lib/store';
import { useTaskData } from '@/hooks/use-task-data';
import { useParams } from 'next/navigation';

type Props = {};

const defaultCols = [
  {
    id: 'TODO' as const,
    title: 'TODO'
  },
  {
    id: 'IN_PROGRESS' as const,
    title: 'IN-PROGRESS'
  },
  {
    id: 'IN_REVIEW' as const,
    title: 'IN-REVIEW'
  },
  {
    id: 'DONE' as const,
    title: 'DONE'
  }
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]['id'];

const KanbanNoDNDBoard = (props: Props) => {
  const params = useParams();
  const columns = useTaskStore((state) => state.columns);
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const { data: TaskData, isLoading } = useTaskData(params.projectId as string);
  const handleSetTask = (data: any) => {
    setTasks(data);
  };

  useEffect(() => {
    if (TaskData) {
      handleSetTask(TaskData);
    }
  }, [TaskData]);

  if (isLoading) {
    return <p className="text-sm">...Loading</p>;
  }

  return (
    <div className="flex w-full flex-col items-start gap-10 overflow-x-auto md:flex-row">
      {columns?.map((col) => (
        <div key={col.id} className="w-full overflow-x-scroll">
          <BoardColumn
            column={col}
            tasks={tasks.filter((task) => {
              return task.status === col.title;
            })}
          />
        </div>
      ))}
    </div>
  );
};

export default KanbanNoDNDBoard;
