import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { StrictMode } from 'react';
import './global.css';
import { ThemeProvider } from './hooks/useThemeContext.tsx';
import { LayoutProvider } from './hooks/useLayout.tsx';
import { UserDataProvider } from './hooks/useUserDataContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LayoutProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </LayoutProvider>
    </ThemeProvider>
  </StrictMode>
);
