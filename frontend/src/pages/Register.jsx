import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await client.post('/auth/register', form);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      navigate('/tasks');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <AuthForm title="Create account" submitLabel="Register" form={form} setForm={setForm} onSubmit={submit} error={error}>
      <p>Already registered? <Link className="text-blue-600" to="/login">Login</Link></p>
    </AuthForm>
  );
}

function AuthForm({ title, submitLabel, form, setForm, onSubmit, error, children }) {
  return (
    <div className="mx-auto mt-16 max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">{title}</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <input className="w-full" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-red-600">{error}</p>}
        <button className="w-full bg-blue-600 text-white" type="submit">{submitLabel}</button>
      </form>
      <div className="mt-4">{children}</div>
    </div>
  );
}
