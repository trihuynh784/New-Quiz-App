import LayoutDefault from "../layouts/layoutDefault";
import LoginPage from "../pages/auth/login";
import TopicsPage from "../pages/topics";
import HomePage from "../pages/home";
import RegisterPage from "../pages/auth/register";
import AnswersPage from "../pages/answers";
import Error from "../pages/Error";
import PrivatePages from "../pages/privatePage/privatePages";
import Quiz from "../components/quiz";
import Results from "../pages/results";

export const routes = [
  {
    element: <LayoutDefault />,
    children: [
      {
        element: <PrivatePages />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/topics",
            element: <TopicsPage />,
          },
          {
            path: "/answers",
            element: <AnswersPage />,
          },
          {
            path: "/quiz/:id",
            element: <Quiz />
          },
          {
            path: "/result/:id",
            element: <Results />
          }
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];
