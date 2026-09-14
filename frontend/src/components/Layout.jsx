import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-slate-900 px-6 py-4 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/tasks" className="font-bold">Task Manager</Link>
          <div className="flex gap-4">
            <Link to="/profile">Profile</Link>
            <button className="border-slate-600 bg-slate-800 text-white" onClick={logout}>Logout</button>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl p-6"><Outlet /></main>
    </div>
  );
}
