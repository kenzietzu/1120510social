import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } 
from "react-router-dom";
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Login, { loginAction } from './components/Login';
import Register, { registerAction } from './components/Register';
import { postAction } from './components/Main';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} action={postAction}/>
      </Route>
      <Route path="/login" element={<Login />} action={loginAction} />
      <Route path="/register" element={<Register />} action={registerAction} />
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
