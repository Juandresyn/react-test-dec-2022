import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reactLogo from './assets/react.svg';
import Cars from './components/Cars';
import Users from './components/Users';
import Reservations from './components/Reservations';
import Logo from './assets/logo.png';
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Rent-a-Car</h1>,
  },
  {
    path: "/manage/cars",
    element: <Cars></Cars>,
  },
  {
    path: "/manage/users",
    element: <Users></Users>,
  },
  {
    path: "/manage/reservations",
    element: <Reservations></Reservations>,
  },
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="/">
          <img src={ Logo } className="logo" alt="Company Logo" />
        </a>
      </div>
      <main className="main">
        <nav className="toolbar">
          <ul className="menu">
            <li>
              <a href="/manage/cars">Manage Cars</a>
            </li>
            <li>
              <a href="/manage/users">Manage Users</a>
            </li>
            <li>
              <a href="/manage/reservations">Manage Reservations</a>
            </li>
          </ul>
        </nav>
        <div className="content">
          <RouterProvider router={router} />
        </div>
      </main>
    </div>
  )
}

export default App;
