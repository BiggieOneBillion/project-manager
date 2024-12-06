import { NextRequest, NextResponse } from 'next/server';
import pb from '../../../lib/pocketbase';

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const data = {
      firstname: body.firstname,
      lastname: body.lastname,
      job: body.job,
      email: body.email,
      gender: body.gender,
      projects: [],
      tasks: [],
      userId: body.userId
    };

    const record = await pb.collection('Employee').create(data);

    return NextResponse.json({
      message: 'Employee Created Successfully',
      record
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const record = await pb.collection('Employee').getFullList();
    return NextResponse.json({ message: 'Successful', record });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  try {
    const data = {
      firstname: body.firstname,
      lastname: body.lastname,
      job: body.job,
      email: body.email,
      gender: body.gender,
      projects: [],
      tasks: []
    };

    const record = await pb.collection('Employee').update(body.id, data);

    return NextResponse.json({
      message: 'Employee data Updated Successfully',
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
