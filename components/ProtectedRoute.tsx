'use client'
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/signin');
    }
  }, [session, router]);

  if (!session) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
