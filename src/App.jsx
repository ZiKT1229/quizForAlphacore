import { RouterProvider, createBrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import Root from "./pages/Root";
import Login from "./pages/Login";
import OrderList from "./pages/OrderList";
import { queryClient } from "./util/http";
import { OrderContextProvider } from "./store/OrderContext";

const router = createBrowserRouter([
  {
    path: "/quizForAlphacore",
    element: <Root />,
    children: [
      {
        path: "/quizForAlphacore",
        element: <OrderList />,
      },
      {
        path: "/quizForAlphacore/login",
        element: <Login />,
      },
    ],
  },
]);

export default function App() {
  return (
    <OrderContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </OrderContextProvider>
  );
}
