import pb from '@/lib/pocketbase';
import EditTaskForm, { IinitialValues } from '../_components/edit-task-form';
import NotFound from '@/app/not-found';

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
  const taskId = params.id.slice(0, 15);
  const projectId = params.id.slice(15);

  const record = await pb.collection('Task').getOne(taskId);

  if (!record) {
    return <NotFound />;
  }

  return (
    <EditTaskForm
      initialValues={record as IinitialValues}
      taskId={taskId}
      projectId={projectId}
    />
  );
}
