import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      if (!userCred.user.emailVerified) {
        setError('Email not verified. Please check your inbox.');
        return;
      }

      const token = await userCred.user.getIdToken();
      await fetch('http://localhost:5000/api/auth/sync', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

const handleGoogleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCred = await signInWithPopup(auth, provider);
    const user = userCred.user;

    const token = await user.getIdToken();

    localStorage.setItem('user', JSON.stringify({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    }));
    localStorage.setItem('token', token);

    window.dispatchEvent(new Event('user-updated'));

    await fetch('http://localhost:5000/api/auth/sync', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate('/');
  } catch (error) {
    console.error(error);
    setError('Google sign-in failed.');
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="w-96 p-6 shadow-md rounded bg-white">
        <h2 className="text-xl mb-4 font-bold text-center">Genimeds Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 mb-3"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded">
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full mt-2 bg-white border py-2 rounded flex items-center justify-center gap-2"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-cyan-600">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
