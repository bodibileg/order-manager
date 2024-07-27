import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../components/Header/Header';
import appSlice from '../store/appSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('Header', () => {
  it('renders correctly with the title from Redux store', () => {
    const store = configureStore({reducer: { app: appSlice}});

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('home')).toBeInTheDocument();
    expect(screen.getByLabelText('settings')).toBeInTheDocument();
  });
});
