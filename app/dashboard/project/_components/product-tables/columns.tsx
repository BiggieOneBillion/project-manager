'use client';
import { Product2 } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import Link from "next/link";

// {
//   category: 'm@example.com',
//   collectionId: 'pbc_1901958808',
//   collectionName: 'Project',
//   created: '2024-11-28 11:17:16.200Z',
//   employees: [],
//   end_date: '2024-12-13 23:00:00.000Z',
//   id: '0f5n6k5nj863k1x',
//   kick_off_date: '2024-11-29 23:00:00.000Z',
//   project_description: 'To stop the blockage of the road and allow free flow',
//   project_name: 'The bridge project',
//   task: [],
//   updated: '2024-11-28 11:17:16.200Z'
// },

function formatDate(date:string){
  return new Date(date).toLocaleDateString();
}

export const columns: ColumnDef<Product2>[] = [
  {
    accessorKey: 'project_name',
    header: 'PROJECT NAME',
    cell: ({row}) => <Link href={`/dashboard/project/manage/${row.original.id}`} key={row.original.id}>{row.original.project_name}</Link>
  },
  {
    accessorKey: 'category',
    header: 'CATEGORY'
  },
  {
    accessorKey: 'project_description',
    header: 'PROJECT DESCRIPTION'
  },
  {
    accessorKey: 'kick_off_date',
    header: 'START DATE',
    cell: ({ row }) => <span>{formatDate(row.original.kick_off_date)}</span>
  },
  {
    accessorKey: 'end_date',
    header: 'END DATE',
    cell: ({ row }) => <span>{formatDate(row.original.end_date)}</span>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
