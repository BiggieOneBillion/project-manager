import EmployeeForm from './employee-form';
import PageContainer from '@/components/layout/page-container';


type EmployeeViewPageProps = {
    id: string;
}

export default function EmployeeViewPage({ id }: EmployeeViewPageProps) {
  return (
    <PageContainer>
      <EmployeeForm id={id} />
    </PageContainer>
  );
}
