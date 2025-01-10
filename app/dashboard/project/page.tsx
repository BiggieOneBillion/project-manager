import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import ProjectListingPage from './_components/project-listing';
// import ProductTableAction from './_components/product-tables/product-table-action';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Suspense } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
// import { serialize } from 'v8';

export const metadata = {
  title: 'Dashboard: Project'
};

type pageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="justify-betweeny flex flex-col items-start">
          <Heading
            title="Projects"
            description="See list of all projects. You can edit existing one, delete project."
          />
          <p className="mt-2 text-sm italic text-gray-500">
            Click on the project name to manage that particular project.
          </p>
          <div className="flex w-full justify-end">
            <Link
              href="/dashboard/create-project"
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </div>
        </div>
        <Separator />
        {/* <ProductTableAction /> */}
        <Suspense
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ProjectListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
