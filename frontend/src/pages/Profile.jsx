import { useEffect, useState } from 'react';
import client from '../api/client';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    client.get('/users/me').then(({ data }) => setUser(data.data));
  }, []);

  const upload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('avatar', file);
    const { data } = await client.put('/users/avatar', formData);
    setUser(data.data);
    setMessage('Avatar updated');
  };

  if (!user) return <p>Loading...</p>;
  return <section className="max-w-md rounded-xl bg-white p-6 shadow">
    <h1 className="mb-4 text-2xl font-bold">Profile</h1>
    <p>{user.name}</p><p>{user.email}</p>
    {user.avatarUrl && <img className="my-4 h-24 w-24 rounded-full object-cover" src={user.avatarUrl} alt="Avatar" />}
    <form className="mt-4 space-y-3" onSubmit={upload}>
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files[0])} />
      <button className="bg-blue-600 text-white" disabled={!file}>Upload avatar</button>
    </form>
    {message && <p className="mt-3 text-green-600">{message}</p>}
  </section>;
}
