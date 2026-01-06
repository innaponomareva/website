import { createContext, useContext, useEffect, useState } from 'react';
import type { UserData } from '../contentful/mapUserData';
import { getUserData } from '../contentful/getUserData';

type UserDataContextValue = {
  data: UserData | null;
  loading: boolean;
  error: string | null;
};

const UserDataContext = createContext<UserDataContextValue | null>(null);

export const useUserDataContext = (): UserDataContextValue => {
  const ctx = useContext(UserDataContext);
  if (!ctx)
    throw new Error(
      'useUserDataContext must be used within a UserDataProvider'
    );
  return ctx;
};

interface UserDataProviderProps {
  children?: React.ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getUserData();
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load CV data.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <UserDataContext.Provider value={{ data, loading, error }}>
      {children}
    </UserDataContext.Provider>
  );
};
