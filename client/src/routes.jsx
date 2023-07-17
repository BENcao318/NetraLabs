import {
  BriefcaseIcon,
  ClockIcon,
  DocumentChartBarIcon,
  PlusCircleIcon,
  Square3Stack3DIcon,
  SquaresPlusIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid'
import { Overview } from './pages/dashboard/overview'
import { Myproject } from './pages/dashboard/myproject'
import { Rules } from './pages/dashboard/rules'
import { Schedule } from './pages/dashboard/schedule'
import { Resources } from './pages/dashboard/resources'
import { Participants } from './pages/dashboard/participants'
import { Submissions } from './pages/dashboard/submissions'
import { Myteam } from './pages/dashboard/myteam'
import { Createhackathon } from './pages/management/createhackathon'

const icon = {
  className: 'w-6 h-6 text-inherit',
}

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <SquaresPlusIcon {...icon} />,
        name: 'Overview',
        path: '/overview',
        element: <Overview />,
      },
      {
        icon: <BriefcaseIcon {...icon} />,
        name: 'My Project',
        path: '/my-project',
        element: <Myproject />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: 'My Team',
        path: '/my-team',
        element: <Myteam />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: 'Rules',
        path: '/rules',
        element: <Rules />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: 'Resources',
        path: '/resources',
        element: <Resources />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'Participants',
        path: '/participants',
        element: <Participants />,
      },
      {
        icon: <Square3Stack3DIcon {...icon} />,
        name: 'Submissions',
        path: '/submissions',
        element: <Submissions />,
      },
      {
        icon: <PlusCircleIcon  {...icon} />,
        name: 'Create A Hackathon',
        path: '/hackathon/new',
        element: <Createhackathon />,
      },
    ],
  },
  {
    title: 'auth pages',
    layout: 'auth',
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: 'sign in',
        path: '/sign-in',
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: 'sign up',
        path: '/sign-up',
      },
    ],
  },
]

export default routes
