import { NextRequest, NextResponse } from 'next/server';
import pb from '../../../lib/pocketbase';

export type apiEmployeeResponse = {
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  firstname: string;
  gender: string;
  id: string;
  job: string;
  lastname: string;
  projects: string[];
  tasks: string[];
  updated: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const data = {
      title: body.title,
      status: body.status,
      description: body.description,
      project_id: body.id,
      employees: [body.employee]
    };

    const record = await pb.collection('Task').create(data); // create task

    // create employeeTask data
    const employeeTaskData = {
      task_id: record.id,
      employee_id: body.employee
    };

    const saveEmployeeTaskData = await pb
      .collection('EmployeeTask')
      .create(employeeTaskData);

    // update employee data
    const employee: apiEmployeeResponse = await pb
      .collection('Employee')
      .getOne(body.employee);
    //
    const updateEmployeeData = {
      ...employee,
      tasks: [...employee.tasks, saveEmployeeTaskData.id]
    };

    const formattedUpdatedData = {
      firstname: updateEmployeeData?.firstname,
      lastname: updateEmployeeData?.lastname,
      job: updateEmployeeData?.job,
      email: updateEmployeeData?.email,
      gender: updateEmployeeData?.gender,
      projects: [...updateEmployeeData?.projects],
      tasks: [...updateEmployeeData?.tasks]
    };

    await pb.collection('Employee').update(body.employee, formattedUpdatedData);

    // update project data
    const project = await pb.collection('Project').getOne(body.id);

    const updateProjectData = {
      ...project,
      task: [...project.task, record.id]
    };

    await pb.collection('Project').update(body.id, updateProjectData);

    return NextResponse.json({
      message: 'Activity Created Successfully',
      record
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// GET ALL TASK BELONGING TO ALL USERS---ONLY FOR ADMIN.
// export async function GET() {
//   try {
//     const record = await pb.collection('Task').getFullList();

//     return NextResponse.json({ message: 'Successful', record });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }

export async function PUT(request: NextRequest) {
  const body = await request.json();

  try {
    const data = {
      title: body.title,
      status: body.status,
      description: body.description,
      project_id: body.project_id,
      employees: [body.employee]
    };

    const record = await pb.collection('Task').update(body.id, data);

    return NextResponse.json({
      message: 'Task Updated Successfully',
      record
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// export async function DELETE(request: NextRequest) {
//   const param =  request.nextUrl.pathname as unknown as {id: string}
//   // eslint-disable-next-line no-console
//   // console.log('param', param)
//   // eslint-disable-next-line no-console
//   // console.log("You have reached the delete route")
//   try {
//     await pb.collection('Project').delete(param?.id);
//     return NextResponse.json({ message: 'Project Deleted' });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }
