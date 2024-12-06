"use client"
import { v4 } from 'uuid';
import { EmployeeAvatar } from '@/app/dashboard/project/manage/[projectId]/_components/employee-avatar';
import React from 'react';
import { useProjectEmployeeData } from '@/hooks/use-projectEmployee-data';

type showProjectType = {
  projectId: string;
}

const ShowProjectEmployees:React.FC<showProjectType> = ({projectId}) => {

   const {data,isLoading} = useProjectEmployeeData();

   if (isLoading) {
     return (
       <p className="text-sm font-medium">...Loading</p>
     )
   }

   const result:[] = data?.filter((datum:any) => datum.project_id === projectId)



  return (
     <div className="flex items-center justify-start gap-1">
     {result?.length > 0 && result.map((project_employee:any) => (<EmployeeAvatar employeeId={project_employee.employee_id} key={v4()} />))}
     </div>
  )
}

export default ShowProjectEmployees;