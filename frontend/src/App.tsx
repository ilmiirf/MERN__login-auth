import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>root</div>,
  },
  {
    path: "/register",
    element: <div>register</div>,
  },
  {
    path: "/login",
    element: <div>login</div>,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
