import { NextRequest, NextResponse } from 'next/server';
import pb from '../../../lib/pocketbase';


export async function POST(request: NextRequest) {
    const body = await request.json();
    try {
        // example create data
        const data = {
            project_id: body.project_id,
            employee_id: body.employeeId,
            role: body.role
        };

        const record = await pb.collection('ProjectEmployee').create(data);  // create projectEmployee data

        // update project data
        const project = await pb.collection('Project').getOne(body.project_id);

        const updateProject = {...project,employee: [...project.employee, record.id] };

        await pb.collection('Project').update(body.project_id,  updateProject);

        // update employee data
        const employee = await pb.collection('Employee').getOne(body.employeeId);

        const updateEmployeeData = {...employee, projects: [...employee.projects, record.id] };

        await pb.collection('Employee').update(body.employeeId,  updateEmployeeData)

        return NextResponse.json({
            message: 'Project  Successfully',
            record
        });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function GET() {
    try {
        const record = await pb.collection('ProjectEmployee').getFullList();
        return NextResponse.json({ message: 'Successful', record });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}