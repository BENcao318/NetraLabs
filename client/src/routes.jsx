import {
  BriefcaseIcon,
  ClockIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid'
import { Avatar } from '@material-tailwind/react'

const icon = {
  className: 'w-5 h-5 text-inherit',
}

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: (
          <Avatar
            src={'/img/overviewImg.png'}
            className="w-5 h-5 text-inherit"
          />
        ),
        name: 'Overview',
        path: '/overview',
      },
      {
        icon: <BriefcaseIcon {...icon} />,
        name: 'My Project',
        path: '/my-project',
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: 'Rules',
        path: '/rules',
      },
      {
        icon: <ClockIcon {...icon} />,
        name: 'Schedule',
        path: '/schedule',
      },
      {
        icon: <BellIcon {...icon} />,
        name: 'Resources',
        path: '/resources',
      },
      {
        icon: <BellIcon {...icon} />,
        name: 'Participants',
        path: '/participants',
      },
      {
        icon: <Square3Stack3DIcon {...icon} />,
        name: 'Submissions',
        path: '/submissions',
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
