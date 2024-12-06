import { NextRequest, NextResponse } from 'next/server';
import pb from '../../../lib/pocketbase';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const data = {
      project_name: body.project_name,
      project_description: body.project_description,
      category: body.project_category,
      kick_off_date: body.kick_off_date,
      end_date: body.end_date,
      employees: [],
      task: [],
      userId: body.userId
    };

    const record = await pb.collection('Project').create(data);

    return NextResponse.json({
      message: 'Project Created Successfully',
      record
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET() {
  let userId;
  try {
    const record = await pb.collection('Project').getFullList({
      filter: `userId = ${userId}`
    });

    return NextResponse.json({ message: 'Successful', record });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  try {
    const data = {
      project_name: body.project_name,
      project_description: body.project_description,
      category: body.category,
      kick_off_date: body.kick_off_date,
      end_date: body.end_date,
      employees: [],
      task: [],
      userId: body.userId
    };

    const record = await pb.collection('Project').update(body.id, data);

    return NextResponse.json({
      message: 'Project Updated Successfully',
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
