// main.tsx or index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import Canvas from './components/Canvas';
import AdminPage from './components/AdminPage'; // Make sure you import the AdminPage
import ProtectedRoute from './utility/ProtectedRoute';
import { AuthProvider } from './utility/AuthContext'; // Wrap everything in the AuthProvider
import LoginPage from './components/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/canvas",
    element: <Canvas />,
  },
  {
    path: "/administrador",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
