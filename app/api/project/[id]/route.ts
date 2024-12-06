import { NextRequest, NextResponse } from 'next/server';
import pb from '../../../../lib/pocketbase';
import { DELETE as deleteTask } from '../../task/[id]/route';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    // Get the project to delete
    const record = await pb.collection('Project').getOne(id);

    // Loop through and delete all tasks within the project
    for (const taskId of record.task) {
      try {
        const taskRequest = new NextRequest(
          `${process.env.WEBSITE_URL}/api/task/${taskId}`
        ) as unknown as Request;

        const taskParam = { params: Promise.resolve({ id: taskId }) };
        await deleteTask(taskRequest, taskParam);
      } catch (error: any) {
        return NextResponse.json(
          { error: `Failed to delete task ${taskId}. ${error.message}` },
          { status: 500 }
        );
      }
    }

    // Get and delete related project employees
    const projectEmployees = await pb
      .collection('ProjectEmployee')
      .getFullList({
        filter: `project_id = '${id}'`
      });

    for (const employee of projectEmployees) {
      try {
        await pb.collection('ProjectEmployee').delete(employee.id);
      } catch (error: any) {
       
        return NextResponse.json(
          {
            error: `Failed to delete related ProjectEmployee ${employee.id}. ${error.message}`
          },
          { status: 500 }
        );
      }
    }

    // Delete the project
    try {
      await pb.collection('Project').delete(id);
    } catch (error: any) {
      return NextResponse.json(
        { error: `Failed to delete project ${id}. ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Project and related tasks deleted successfully.'
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `An unexpected error occurred. ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = (await params).id;
  try {
    const record = await pb.collection('Project').getFullList({
      filter: `userId='${userId}'`
    });

    return NextResponse.json({ message: 'Successful', record });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
