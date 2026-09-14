import { useEffect, useState } from 'react';
import client from '../api/client';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '' });
  const [form, setForm] = useState({ title: '', description: '', deadline: '', priority: 'medium', status: 'todo', tags: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value)
      );
      const { data } = await client.get('/tasks', { params });
      setTasks(data.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not load tasks');
    }
  };

  useEffect(() => { loadTasks(); }, [filters.search, filters.status, filters.priority]);

  const saveTask = async (event) => {
    event.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) };
    try {
      if (editingId) await client.put(`/tasks/${editingId}`, payload);
      else await client.post('/tasks', payload);
      setForm({ title: '', description: '', deadline: '', priority: 'medium', status: 'todo', tags: '' });
      setEditingId(null);
      await loadTasks();
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Could not save task');
    }
  };

  const editTask = (task) => {
    setEditingId(task._id);
    setForm({ ...task, deadline: task.deadline.slice(0, 16), tags: task.tags.join(', ') });
  };

  const deleteTask = async (id) => {
    await client.delete(`/tasks/${id}`);
    await loadTasks();
  };

  return (
    <section>
      <form className="mb-6 rounded-xl bg-white p-5 shadow" onSubmit={saveTask}>
        <h1 className="mb-4 text-xl font-bold">{editingId ? 'Edit task' : 'Create task'}</h1>
        <div className="grid gap-3 md:grid-cols-2">
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input required type="datetime-local" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input placeholder="Tags, separated by commas" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="todo">Todo</option><option value="in-progress">In progress</option><option value="done">Done</option></select>
          <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="bg-blue-600 text-white" type="submit">{editingId ? 'Update' : 'Create'}</button>
          {editingId && <button type="button" onClick={() => setEditingId(null)}>Cancel</button>}
        </div>
      </form>
      <div className="mb-6 flex flex-wrap gap-3">
        <input placeholder="Search title" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All statuses</option><option value="todo">Todo</option><option value="in-progress">In progress</option><option value="done">Done</option>
        </select>
        <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
          <option value="">All priorities</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
        </select>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => <article className="rounded-xl bg-white p-5 shadow" key={task._id}>
          <h2 className="font-bold">{task.title}</h2>
          <p className="text-sm text-slate-600">{task.description}</p>
          <p className="mt-3 text-sm">Status: {task.status} · Priority: {task.priority}</p>
          <div className="mt-3 flex gap-2"><button onClick={() => editTask(task)}>Edit</button><button className="bg-red-600 text-white" onClick={() => deleteTask(task._id)}>Delete</button></div>
        </article>)}
      </div>
      {!tasks.length && !error && <p>No tasks found.</p>}
    </section>
  );
}
