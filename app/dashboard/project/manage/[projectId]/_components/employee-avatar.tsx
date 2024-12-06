import { useEmployeeData } from '@/hooks/use-employee-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { v4 } from 'uuid';
import { apiEmployeeResponse } from '@/app/api/task/route';


function displayEmployeeNameAbb(firstName: string, lastName: string): string {
  return `${firstName.slice(0,1)}${lastName.slice(0,1)}`.toUpperCase();
}


export const EmployeeAvatar = ({ employeeId }: { employeeId: string }) => {
   const {data, isLoading} = useEmployeeData()

  if (isLoading) {
    return (
      <p className="text-sm font-medium">...Loading</p>
    )
  }

  const employeeData:apiEmployeeResponse[] = data?.filter((employee:any) => employee.id === employeeId);

  return (
     <>
       {employeeData.map((datum) =>
         (
           <Avatar key={v4()}>
             <AvatarImage src="#" alt="employee avatar image" />
             <AvatarFallback>{displayEmployeeNameAbb(datum.firstname, datum.lastname)}</AvatarFallback>
           </Avatar>
         )
       )}

     </>
  )
}