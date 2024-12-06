import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import { Product2 } from '@/constants/data';
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
    const data =  await pb.collection('Project').getOne(projectId)
    
     product = data as Product2;

    if (!product) {
      notFound();
    }
    pageTitle = `Edit Project`;
  }
  

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
