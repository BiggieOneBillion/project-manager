"use client"
import {Product2} from '@/constants/data';
import {DataTable as ProductTable} from '@/components/ui/table/data-table';
import {columns} from './product-tables/columns';
import {DataTableSkeleton} from "@/components/ui/table/data-table-skeleton";
import {useProjectData} from "@/hooks/use-project-data";


export default function ProductListingPage() {

  const {data, isLoading, isError} = useProjectData();


  if (isLoading){
    return <DataTableSkeleton columnCount={5} rowCount={10} />
  }

  if (isError){
    return <p className="text-xl font-medium">Something Happened. Try again later</p>
  }


  const totalProducts = data.length || 0;
  const products: Product2[] = data as Product2[];

  return (
    <ProductTable
      columns={columns}
      data={products}
      totalItems={totalProducts}
    />
  );
}
