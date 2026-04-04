  import { createBrowserRouter } from 'react-router-dom'
  import Layout from './components/Layout'
  import Home from './pages/Home'
  import NotFound from './pages/NotFound'
  import NewEvent from './pages/NewEvent'
  import EventPage from './pages/EventPage'

  export const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {index: false, path: 'newEvent', element: <NewEvent /> },
        { path: '*', element: <NotFound /> },
        {path: '/event/:id', element: <EventPage/>}
      ],
    },
  ])
