"use client"
import { redirect } from 'next/navigation';
import { useUserDetailsStore } from '@/lib/manager-store';

export default function Dashboard() {

  const userDetails  = useUserDetailsStore((state) => state.userDetails)

  if (!userDetails.email) {
    return redirect('/');
  } else {
    redirect('/dashboard/create-project');
  }
}
