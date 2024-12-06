import { NextResponse } from 'next/server';
import pb from '../../../../lib/pocketbase';

// more logic still needs to be implemented here later on!
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    // Get the employee to delete
    const record = await pb.collection('Employee').getOne(id);

    // Loop through and delete all tasks that the employee has in the EmployeeTask.
    for (const taskId of record.tasks) {
      try {
        await pb.collection('EmployeeTask').delete(taskId);
      } catch (error: any) {
        return NextResponse.json(
          { error: `Failed to delete task ${taskId}. ${error.message}` },
          { status: 500 }
        );
      }
    }

    // Loop through and delete all tasks that the employee has in the EmployeeTask.
    for (const projectEmployeeId of record.projects) {
      try {
        await pb.collection('ProjectEmployee').delete(projectEmployeeId);
      } catch (error: any) {
        return NextResponse.json(
          {
            error: `Failed to delete task ${projectEmployeeId}. ${error.message}`
          },
          { status: 500 }
        );
      }
    }

    await pb.collection('Employee').delete(id);
    return NextResponse.json({ message: 'Employee Data Deleted' });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = (await params).id;

  try {
    const record = await pb.collection('Employee').getFullList({
      filter: `userId='${userId}'`
    });

    return NextResponse.json({ message: 'Successful', record });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
