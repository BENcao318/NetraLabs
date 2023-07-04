import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid'

const icon = {
  className: 'w-5 h-5 text-inherit',
}

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: 'dashboard',
        path: '/home',
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'profile',
        path: '/profile',
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: 'tables',
        path: '/tables',
      },
      {
        icon: <BellIcon {...icon} />,
        name: 'notifactions',
        path: '/notifactions',
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
