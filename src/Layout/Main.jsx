import { Outlet } from "react-router-dom";
import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from "../Shared/Navbar/Navbar";

const Main = () => {

    
  const location = useLocation();

  useEffect(() => {
    const routeTitle = getTitleFromLocation(location.pathname);
    document.title = `Task Management - ${routeTitle}`;
  }, [location]);

  // Helper function to get the title based on the current route
  const getTitleFromLocation = (pathname) => {
    switch (pathname) {
      case '/':
        return 'All Tasks';
      case '/addATask':
        return 'Add a Task';
      default:
        return 'Not Found';
    }
  };

    return (
        <div>
          <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;




