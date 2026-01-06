import { createContext, useContext, useEffect, useState } from 'react';

export enum Layouts {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

export type Layout = Layouts.LANDSCAPE | Layouts.PORTRAIT;

export type LayoutContextValue = {
  layout: Layout | null;
  width: number | null;
  height: number | null;
};

export const LayoutContext = createContext<LayoutContextValue | null>(null);

export const useLayout = (): LayoutContextValue => {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used within a LayoutProvider');
  return ctx;
};

interface LayoutProviderProps {
  children?: React.ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (width != null && height != null) {
      if (width > height) {
        setLayout(Layouts.LANDSCAPE);
      } else {
        setLayout(Layouts.PORTRAIT);
      }
    }
  }, [width, height]);

  return (
    <LayoutContext.Provider value={{ layout, width, height }}>
      {children}
    </LayoutContext.Provider>
  );
};
