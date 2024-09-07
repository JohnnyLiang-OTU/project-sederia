import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import Canvas from './components/Canvas.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
  path: "/canvas",
  element: <Canvas />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
