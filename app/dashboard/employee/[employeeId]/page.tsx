import EmployeeViewPage from '../_components/employee-view-page';

export const metadata = {
  title: 'Dashboard : Employee View'
};

type PageProps = { params: { employeeId: string } };

export default function Page({ params }: PageProps): JSX.Element {
  return <EmployeeViewPage id={params.employeeId} />;
}
