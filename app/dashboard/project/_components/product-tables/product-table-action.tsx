'use client';

import { DataTableSearch } from '@/components/ui/table/data-table-search';
import {
  useProductTableFilters
} from './use-product-table-filters';

export default function ProductTableAction() {
  const {
    searchQuery,
    setPage,
    setSearchQuery
  } = useProductTableFilters();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="name"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
    </div>
  );
}
