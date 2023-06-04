import { createBrowserRouter } from "react-router-dom";
import NotFound from "./../NotFound/NotFound";
import Main from "../Layout/Main";
import AllTasks from "../pages/AllTasks/AllTasks";
import AddTask from "../pages/AddTask/AddTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Main></Main>
    ),
    children: [
      {
        path: '/',
        element: <AllTasks></AllTasks>
      },
      {
        path: '/addATask',
        element: <AddTask></AddTask>
      },
    ]
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]);


export default router;
