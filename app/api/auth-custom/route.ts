import { NextRequest, NextResponse } from 'next/server';
import pb from '../../../lib/pocketbase';

export async function POST(request: NextRequest) {
  const body = await request.json();
  // // console.log(body);
  try {
    const result = await pb.collection('Managers').getList(); // get the entire users list
    const dataList = result.items; // get the arr of users from the response
    const check = dataList.filter((item: any) => item.email === body.email); // check if any mail matches with the provided email
    if (check.length > 0) {
      // const token = generateToken({ email: body.email, id: check[0].id });
      // user exits so we get the user id and use it to fetch projects associated with user
      return NextResponse.json({
        message: 'Successfully Logged in',
        data: check[0]
      });
    }
    // if not we go ahead to create the user using their email.
    const data = {
      email: body.email
    };

    const record = await pb.collection('Managers').create(data);

    // const token = generateToken({ email: body.email, id: record.id });

    // return record;

    // after creating the record then we store the id ,and we use to save the projects e.t.c

    return NextResponse.json({
      message: 'Successfully registered',
      data: record
    });
  } catch (error: unknown) {
    // // console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
//
export async function GET(_request: NextRequest) {
  try {
    const record = await pb.collection('Managers').getFullList();
    // // console.log(record);
    return NextResponse.json({ message: 'Successful', record });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// export async function PUT(request: NextRequest) {
//   const body = await request.json();
//   // // console.log(body);
//
//   try {
//     const data = {
//       project_name: body.project_name,
//       project_description: body.project_description,
//       category: body.category,
//       kick_off_date: body.kick_off_date,
//       end_date: body.end_date,
//       employees: [],
//       task: []
//     };
//
//     const record = await pb.collection('Project').update(body.id, data);
//
//     return NextResponse.json({
//       message: 'Project Updated Successfully',
//       record
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 500 });
//   }
// }
