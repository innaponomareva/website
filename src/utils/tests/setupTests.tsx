import '@testing-library/jest-dom/vitest';
import '@testing-library/react';
import '@testing-library/react/dont-cleanup-after-each';
import './matchers/toHaveStyleRule';

import { render, type RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../../hooks/useThemeContext';
import { LayoutProvider } from '../../hooks/useLayout';
import type { ReactElement } from 'react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
