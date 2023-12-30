import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//importar los iconos de fontanswre
import '@fortawesome/fontawesome-free/css/all.min.css';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

//rutas
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//importar nuestras propias paginas
import { Login, Register, Welcome} from './pages';
import {ProtectedRoute} from './security';
import { AuthServiceProvider } from './auth';

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/register",
    element: <Register />
  },
  {
    path:"/",
    element: <ProtectedRoute />,
    children:[
      {
        path:"/welcome",
        element:<Welcome />,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthServiceProvider>
      
      <RouterProvider router={router} />
    </AuthServiceProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
