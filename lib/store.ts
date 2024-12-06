import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Column } from '@/app/dashboard/kanban/_components/board-column';
import { ITaskDataType } from '@/types/data';

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

// to-do, in-progress, in-review, done

// const defaultCols = [
//   {
//     id: 'to-do' as const,
//     title: 'Todo'
//   },
//     {
//         id: 'in-progress' as const,
//         title: 'In Progress'
//     },
//   {
//     id: 'in-review' as const,
//     title: 'In Review'
//   },
//   {
//         id: 'done' as const,
//         title: 'Done'
//     }
// ] satisfies Column[];


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

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
};

export type State = {
  tasks: ITaskDataType[];
  columns: Column[];
  draggedTask: string | null;
};

const initialTasks: ITaskDataType[] = [];

export type Actions = {
  addTask: (task:ITaskDataType) => void;
  addCol: (title: string) => void;
  dragTask: (id: string | null) => void;
  removeTask: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setTasks: (updatedTask: ITaskDataType[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

// @ts-ignore
export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: defaultCols,
      draggedTask: null,
      addTask: (task:ITaskDataType) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            task
          ]
        })),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col
          )
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [
            ...state.columns,
            { title, id: state.columns.length ? title.toUpperCase() : 'TODO' }
          ]
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id)
        })),
      setTasks: (newTasks: ITaskDataType[]) => set({ tasks: newTasks }),
      setCols: (newCols: Column[]) => set({ columns: newCols })
    }),
    { name: 'task-store', skipHydration: true }
  )
);
