import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <>
        <Navbar2 />
        <div className="min-h-[50vh] flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-4">You need to be signed in to view this page.</p>
            <Link to="/login" className="text-[#138695] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar2 />
      <div className="min-h-[70vh] px-4 py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Profile</h1>
        <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-6">
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-foreground font-medium">{user.email}</p>
          <p className="text-gray-400 text-sm mt-4">Username</p>
          <p className="text-foreground font-medium">{user.username}</p>
        </div>
        <Link
          to="/"
          className="inline-block mt-6 text-[#138695] hover:underline"
        >
          ← Back to home
        </Link>
      </div>
      <Footer />
    </>
  );
}
