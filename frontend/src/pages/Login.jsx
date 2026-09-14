import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await client.post('/auth/login', form);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      navigate('/tasks');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AuthForm title="Login" submitLabel="Login" form={form} setForm={setForm} onSubmit={submit} error={error}>
      <p>New here? <Link className="text-blue-600" to="/register">Create an account</Link></p>
    </AuthForm>
  );
}

function AuthForm({ title, submitLabel, form, setForm, onSubmit, error, children }) {
  return (
    <div className="mx-auto mt-16 max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        {form.name !== undefined && <input className="w-full" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        <input className="w-full" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-red-600">{error}</p>}
        <button className="w-full bg-blue-600 text-white" type="submit">{submitLabel}</button>
      </form>
      <div className="mt-4">{children}</div>
    </div>
  );
}
