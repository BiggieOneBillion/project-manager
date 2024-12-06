import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '../_components/product-view-page';

export const metadata = {
  title: 'Dashboard : Project View'
};

type PageProps = { params: { projectId: string } };

export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
          <Suspense fallback={<FormCardSkeleton/>}>
              <h1 className="text-3xl font-extrabold">Welcome</h1>

              <ProductViewPage projectId={params.projectId} />
          </Suspense>
      </div>
    </PageContainer>
  );
}
