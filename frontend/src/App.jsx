import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import * as sessionActions from './store/session';
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import ContactsPage from "./components/ContactsPage";
import ProjectsPage from "./components/ProjectsPage";
import ProjectsPipeline from "./components/ProjectsPage/ProjectsPipeline";
import ProjectsAnalysis from "./components/ProjectsPage/ProjectsAnalysis";
import TeamPage from "./components/TeamPage";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/contacts',
        element: <ContactsPage />
      },
      {
        path: '/projects',
        element: <ProjectsPage />
      },
      {
        path: '/projects/pipeline',
        element: <ProjectsPipeline />
      },
      {
        path: '/projects/analysis',
        element: <ProjectsAnalysis />
      },
      {
        path: '/team',
        element: <TeamPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
