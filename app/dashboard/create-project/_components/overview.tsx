"use client"
import PageContainer from '@/components/layout/page-container';
import ProjectForm from './project-form';


export default function OverViewPage() {
 
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <section className="space-y-4 ">
           <p className='text-sm'>Hello welcome to Chef de Project, create your new project by filling the form below to start </p>
           <ProjectForm />
        </section>
      </div>
    </PageContainer>
  );
}



