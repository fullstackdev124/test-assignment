/**
 * Auth API client (backend at VITE_API_URL or http://localhost:8000).
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getToken = () => localStorage.getItem('auth_token');

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Login failed');
  }
  return res.json();
}

export async function register(email, username, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Registration failed');
  }
  return res.json();
}

export async function fetchMe(token) {
  const t = (token || '').trim();
  if (!t) return null;
  const res = await fetch(`${API_BASE}/me`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${t}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

export { getToken };
export const setToken = (token) => {
  if (token) localStorage.setItem('auth_token', token);
  else localStorage.removeItem('auth_token');
};
