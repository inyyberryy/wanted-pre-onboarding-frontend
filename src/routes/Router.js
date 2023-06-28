import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Todo from "../pages/Todo";
import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";

const redirectHome = () => {
  return redirect("/signin");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <></>,
    loader: redirectHome,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "*",
    // eslint-disable-next-line react/jsx-no-undef
    element: <div>오류</div>,
  },
]);

export default router;
