import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);

      const token = await userCred.user.getIdToken();

      await fetch('http://localhost:5000/api/auth/sync', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      alert('Verification email sent. Please check your inbox.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      await fetch('http://localhost:5000/api/auth/sync', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/');
    } catch (err) {
      setError('Google sign-up failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleRegister} className="w-96 p-6 shadow-md rounded bg-white">
        <h2 className="text-xl mb-4 font-bold text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 mb-3"
        />
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
          Register
        </button>
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full mt-2 bg-white border py-2 rounded flex items-center justify-center gap-2"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-cyan-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
