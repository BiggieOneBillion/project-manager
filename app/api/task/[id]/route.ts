import { NextResponse } from 'next/server';
import pb from '../../../../lib/pocketbase';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const taskId = id.slice(0, 15);
  try {

    const employeeTask = await pb.collection('EmployeeTask').getFullList({
        // get the list of task and filter to get the one that matches the task
        filter: `task_id = '${taskId}'`
      });
      
    await pb.collection('EmployeeTask').delete(employeeTask[0].id);

    await pb.collection('Task').delete(taskId); // delete the task

    return NextResponse.json({ message: 'Project Deleted' });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    try {
      const record = await pb.collection('Task').getFullList({
        filter:`project_id='${id}'`
      });

      return NextResponse.json({ message: 'Successful', record });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });

    }
  }
