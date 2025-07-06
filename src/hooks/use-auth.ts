
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client-side
    try {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!loggedIn) {
        router.replace('/');
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
        console.error("Could not access localStorage:", error);
        router.replace('/');
    } finally {
        setIsLoading(false);
    }
  }, [router]);

  return { isAuthenticated, isLoading };
}
