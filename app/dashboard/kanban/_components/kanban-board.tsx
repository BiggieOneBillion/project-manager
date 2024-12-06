'use client';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTaskStore } from '@/lib/store';
import { hasDraggableData } from '@/lib/utils';
import {
  Announcements,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import type { Column } from './board-column';
import { BoardColumn, BoardContainer } from './board-column';
import NewSectionDialog from './new-section-dialog';
import { TaskCard } from './task-card';
import { useTaskData } from '@/hooks/use-task-data';
import { ITaskDataType } from '@/types/data';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
// import { coordinateGetter } from "./multipleContainersKeyboardPreset";

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

export function KanbanBoard() {
  // const [columns, setColumns] = useState<Column[]>(defaultCols);

  const params = useParams();

  const columns = useTaskStore((state) => state.columns);

  // // console.log("Initial Columns-----",columns )

  const setColumns = useTaskStore((state) => state.setCols);
  const pickedUpTaskColumn = useRef<ColumnId | 'TODO' | 'IN_PROGRESS' | 'DONE'>(
    'TODO'
  );
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [isMounted, setIsMounted] = useState<Boolean>(false);

  const columnMapping: Map<string, string> = new Map<string, string>();

  columnMapping.set('0297mr6uk31nzxy', 'to-do');
  columnMapping.set('y3h29r5ntxjy10p', 'in-progress');
  columnMapping.set('sdf87gn9g2ch24r', 'in-review');
  columnMapping.set('b8r4j1ks9pqwz8d', 'done');

  const [activeTask, setActiveTask] = useState<ITaskDataType | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: coordinateGetter,
    // }),
  );

  const { data: TaskData, isLoading } = useTaskData(params.projectId as string);

  // // console.log(TaskData);

  // console.log('Task----', tasks);

  const handleSetTask = (data: any) => {
    setTasks(data);
  };

  useEffect(() => {
    if (TaskData) {
      handleSetTask(TaskData);
    }
  }, [TaskData]);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  useEffect(() => {
    useTaskStore.persist.rehydrate();
  }, []);

  if (isLoading) {
    return <p className="text-sm">...Loading</p>;
  }

  if (!isMounted) return;

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = tasks.filter((task) => task.status === columnId);
    const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column
    };
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === 'Column') {
        const startColumnIdx = columnsId.findIndex((id) => id === active.id);
        const startColumn = columns[startColumnIdx];
        return `Picked up Column ${startColumn?.title} at position: ${
          startColumnIdx + 1
        } of ${columnsId.length}`;
      } else if (active.data.current?.type === 'Task') {
        // @ts-ignore
        pickedUpTaskColumn.current = active.data.current.task.status;
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current
        );
        return `Picked up Task ${active.data.current.task.title} at position: ${
          taskPosition + 1
        } of ${tasksInColumn.length} in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === 'Column' &&
        over.data.current?.type === 'Column'
      ) {
        const overColumnIdx = columnsId.findIndex((id) => id === over.id);
        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overColumnIdx + 1} of ${columnsId.length}`;
      } else if (
        active.data.current?.type === 'Task' &&
        over.data.current?.type === 'Task'
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          // @ts-ignore
          over.data.current.task.status
        );
        if (over.data.current.task.status !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.task.title
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = 'TODO';
        return;
      }
      if (
        active.data.current?.type === 'Column' &&
        over.data.current?.type === 'Column'
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columnsId.length
        }`;
      } else if (
        active.data.current?.type === 'Task' &&
        over.data.current?.type === 'Task'
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          // @ts-ignore
          over.data.current.task.status
        );
        if (over.data.current.task.status !== pickedUpTaskColumn.current) {
          return `Task was dropped into column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpTaskColumn.current = 'TODO';
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = 'TODO';
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    }
  };

  return (
    <DndContext
      accessibility={{
        announcements
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns?.map((col) => (
            <Fragment key={col.id}>
              <BoardColumn
                column={col}
                tasks={tasks.filter((task) => {
                  return task.status === col.title;
                })}
              />
              {/*{index === columns?.length - 1 && (*/}
              {/*  <div className="w-[300px]">*/}
              {/*    <NewSectionDialog />*/}
              {/*  </div>*/}
              {/*)}*/}
            </Fragment>
          ))}
          {!columns.length && <NewSectionDialog />}
        </SortableContext>
      </BoardContainer>

      {'document' in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={tasks.filter((task) => task.status === activeColumn.id)}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === 'Column') {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === 'Task') {
      // @ts-ignore
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    // // console.log("Event =", event);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id as string;

    if (!hasDraggableData(active)) return;

    const activeData = active.data.current;

    // If the active item is a column
    if (activeData?.type === 'Column') {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      setColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
    }

    // // console.log("Active Data:", activeData);
    // If the active item is a task
    if (activeData?.type === 'Task') {
      const activeTaskIndex = tasks.findIndex((task) => task.id === activeId);
      const activeTask = tasks[activeTaskIndex];

      if (!activeTask) return;

      // Check if the task is dropped into a different column
      // // console.log(activeTask.status !== event?.collisions[1].id);

      // @ts-ignore
      if (activeTask.status === event?.collisions[1].id) {
        // eslint-disable-next-line no-console
        // // console.log('Hello');
        // Update task status
        // @ts-ignore
        const updatedTask = {
          ...activeTask,
          status: event?.collisions[1].id as ColumnId
        };
        const updatedTasks = tasks.map((task) =>
          task.id === activeId ? updatedTask : task
        );

        // // console.log("UPDATED TASK",updatedTasks);

        // Update tasks in the store
        setTasks(updatedTasks);

        // Call the update function to persist changes
        updateTaskStatusOnServer(activeTask.id, updatedTask);
      }
    }
  }

  async function updateTaskStatusOnServer(id: string, task: any) {
    try {
      await axios.put('/api/task', { ...task });
      toast.success('task status updated successfully.');
    } catch (e) {
      toast.error('Operation not successful.');
    }
  }

  // function onDragEnd(event: DragEndEvent) {
  //   setActiveColumn(null);
  //   setActiveTask(null);
  //
  //   const { active, over } = event;
  //   if (!over) return;
  //
  //   const activeId = active.id;
  //   const overId = over.id;
  //
  //   if (!hasDraggableData(active)) return;
  //
  //   const activeData = active.data.current;
  //
  //   if (activeId === overId) return;
  //
  //   const isActiveAColumn = activeData?.type === 'Column';
  //   if (!isActiveAColumn) return;
  //
  //   const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
  //
  //   const overColumnIndex = columns.findIndex((col) => col.id === overId);
  //
  //   setColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
  // }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === 'Task';
    const isOverATask = activeData?.type === 'Task';

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);
      const activeTask = tasks[activeIndex];
      const overTask = tasks[overIndex];
      if (activeTask && overTask && activeTask.status !== overTask.status) {
        activeTask.status = overTask.status;
        setTasks(arrayMove(tasks, activeIndex, overIndex - 1));
      }

      setTasks(arrayMove(tasks, activeIndex, overIndex));
    }

    const isOverAColumn = overData?.type === 'Column';

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const activeTask = tasks[activeIndex];
      if (activeTask) {
        activeTask.status = overId as ColumnId;
        setTasks(arrayMove(tasks, activeIndex, activeIndex));
      }
    }
  }
}
