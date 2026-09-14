import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';

export default function App() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/tasks" replace />} />
  </Routes>;
}
