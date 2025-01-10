import { notFound } from 'next/navigation';
import ProjectForm from './project-form';
import { Project } from '@/constants/data';
import pb from '@/lib/pocketbase';

type TProductViewPageProps = {
  projectId: string;
};

export default async function ProductViewPage({
  projectId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Project';

  if (projectId !== 'new') {
    const data = await pb.collection('Project').getOne(projectId);

    product = data as Project;

    if (!product) {
      notFound();
    }
    pageTitle = `Edit Project`;
  }

  return <ProjectForm initialData={product} pageTitle={pageTitle} />;
}
