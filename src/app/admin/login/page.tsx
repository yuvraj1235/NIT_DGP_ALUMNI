'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/admin/login', {
        username,
        email,
        password,
      });

      if (res.status === 200) {
        console.log('Login success:', res.data);
        // Optionally store token or session data here (if using JWT, etc.)
        router.push('/admin/dashboard'); // or wherever the admin lands after login
      }
    } catch (err: any) {
      console.error(err.response?.data?.message || 'Login failed');
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#101828] p-8 rounded-lg shadow-lg border border-[#1f2937]">
        <h2 className="text-3xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Sign in to access the nomination dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div>
            <label htmlFor="username" className="block mb-1 text-sm text-gray-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md font-semibold transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}