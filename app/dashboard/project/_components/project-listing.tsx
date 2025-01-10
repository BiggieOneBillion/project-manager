'use client';
import { Project } from '@/constants/data';
import { DataTable as ProjectTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useProjectData } from '@/hooks/use-project-data';

export default function ProjectListingPage() {
  const { data, isLoading, isError } = useProjectData();

  if (isLoading) {
    return <DataTableSkeleton columnCount={5} rowCount={10} />;
  }

  if (isError) {
    return (
      <p className="text-xl font-medium">Something Happened. Try again later</p>
    );
  }

  const totalProducts = data.length || 0;
  const products: Project[] = data as Project[];

  return (
    <ProjectTable
      columns={columns}
      data={products}
      totalItems={totalProducts}
    />
  );
}
