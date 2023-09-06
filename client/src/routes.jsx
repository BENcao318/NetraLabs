import {
  BriefcaseIcon,
  Square3Stack3DIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid'
import { Submissions } from 'pages/dashboard/submissions/submissions'
import { SignIn } from 'pages/auth/signin'
import { SignUp } from 'pages/auth/signup'
import { HackathonList } from 'pages/dashboard/hackathons/hackathonList'
import { ProjectList } from 'pages/dashboard/projects/projectList'
import { ParticipantsList } from 'pages/dashboard/participants/participantsList'

const icon = {
  className: 'w-6 h-6 text-inherit',
}

export const routes = [
  {
    title: 'User Dashboard',
    layout: 'userDashboard',
    pages: [
      {
        icon: <SquaresPlusIcon {...icon} />,
        name: 'Hackathons',
        path: '/hackathons',
        element: <HackathonList />,
      },
      {
        icon: <BriefcaseIcon {...icon} />,
        name: 'Team Project',
        path: '/team-project',
        element: <ProjectList />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'Participants',
        path: '/participants',
        element: <ParticipantsList />,
      },
      {
        icon: <Square3Stack3DIcon {...icon} />,
        name: 'Submissions',
        path: '/submissions',
        element: <Submissions />,
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
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: 'sign up',
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
]

export default routes
