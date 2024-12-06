import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ProductTableAction from '@/app/dashboard/project/_components/product-tables/product-table-action';
import { KanbanBoard } from '@/app/dashboard/kanban/_components/kanban-board';
import { CreateTaskDialog } from '@/app/dashboard/project/manage/[projectId]/_components/create-task-dialog';
import { AddEmployeeDialog } from '@/app/dashboard/project/manage/[projectId]/_components/add-employee-to-project';
import ShowProjectEmployee from '@/app/dashboard/project/manage/[projectId]/_components/show-project-employee';

type PageProps = { params: { projectId: string } };

export default async function Page({ params }: PageProps) {
  // eslint-disable-next-line no-console
  // console.log(params.projectId);
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Manage Projects"
            description="See list of all projects. You can edit existing one, delete project."
          />
        </div>
        <Separator />
        <div className="flex items-center justify-start gap-4">
          <ProductTableAction />
          <div className="flex items-center justify-start gap-4">
            <AddEmployeeDialog projectId={params.projectId} />
            <ShowProjectEmployee projectId={params.projectId} />
          </div>
        </div>
        <CreateTaskDialog projectId={params.projectId} />
        <KanbanBoard />
      </div>
    </PageContainer>
  );
}
