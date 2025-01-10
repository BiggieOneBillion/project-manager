import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ProjectSelect from '@/app/dashboard/project-manager/_components/project-select';
import AddEmployees from '@/app/dashboard/project-manager/_components/add-employees';

const Index = () => {
  return (
    <>
      <PageContainer>
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Heading
              title="Projects Manager"
              description="Manage all your projects, Add activities and Assign them to your employees"
            />
          </div>
          <Separator />
          <ProjectSelect />
          <AddEmployees />
        </div>
      </PageContainer>
    </>
  );
};

export default Index;
