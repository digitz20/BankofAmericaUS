
'use client';

import { useEffect, useState } from 'react';

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client-side
    try {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(loggedIn);
    } catch (error) {
        console.error("Could not access localStorage:", error);
        setIsAuthenticated(false);
    } finally {
        setIsLoading(false);
    }
  }, []);

  return { isAuthenticated, isLoading };
}
