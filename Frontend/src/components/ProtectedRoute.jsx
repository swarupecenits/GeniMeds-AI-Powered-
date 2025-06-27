<<<<<<< HEAD
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 

  if (!token) {
=======
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return null;
  }

  if (!user) {
>>>>>>> 02f28d503dfda56e2cd169e6f3d54011637807c4
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
