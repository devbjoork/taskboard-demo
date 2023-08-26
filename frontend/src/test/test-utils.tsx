import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { store } from '@/store/store';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={<Provider store={store}>{children}</Provider>}
        />
      </Routes>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender };
