import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  // phone: string;
  gender: string;
  // date_of_birth: string; // Consider using a proper date type if possible
  // street: string;
  // city: string;
  // state: string;
  // country: string;
  // zipcode: string;
  job: string;
  // profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export type Product = {
  id: number;
  projectName: string;
  projectDescription: string;
  start_date: string;
  end_date: string;
  category: string;
};

export interface Project {
  category: string;
  collectionId: string;
  collectionName: string;
  created: string;
  employees: string[];
  end_date: string;
  id: string;
  kick_off_date: string;
  project_description: string;
  project_name: string;
  task: string[];
  updated: string;
}

export const navItems: NavItem[] = [
  {
    title: 'Create Project',
    url: '/dashboard/create-project',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Project List',
    url: '/dashboard/project',
    icon: 'project',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Employees',
    url: '/dashboard/employee',
    icon: 'user',
    shortcut: ['e', 'e'],
    isActive: false,
    items: [] // No child items
  }
  // {
  //   title: 'Project Manager',
  //   url: "",
  //   icon: 'userPen',
  //   shortcut: ['e', 'e'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // },
  // {
  //   title: 'Activity Board',
  //   url: "",
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // }
];
