// useSession.js
import { useState, useEffect } from 'react';

export const useSession = () => {
  const [authenticated, setAuthenticated] = useState();

  useEffect(() => {
    const checkSession = () => {
      
      const sessionData = sessionStorage.getItem('user');
      if(sessionData)
      setAuthenticated(true);
    };

    checkSession();
  }, []);

  return authenticated;
};
