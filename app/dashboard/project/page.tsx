import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import ProductListingPage from './_components/product-listing';
import ProductTableAction from './_components/product-tables/product-table-action';

export const metadata = {
  title: 'Dashboard: Project'
};

type pageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  // pb.collection('Project').getFullList().then(data => // console.log(data)).catch((rec) => // console.log(rec))

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
          {/* <Link
            href="/dashboard/project/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />
        <ProductTableAction />
        {/*<Suspense*/}
        {/*  key={key}*/}
        {/*  fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}*/}
        {/*>*/}
        <ProductListingPage />
        {/*</Suspense>*/}
      </div>
    </PageContainer>
  );
}
