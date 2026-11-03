import { renderHook, act } from '@testing-library/react';
import { UserProvider, useUser } from './UserContext';

beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });

test('login restores the user and logout removes both user and token', () => {
  const response = { user: { id: 1, email: 'demo@example.invalid' }, jwt: 'test-token' };
  const view = renderHook(() => useUser(), { wrapper: UserProvider });
  act(() => view.result.current.login(response, false));
  expect(view.result.current.user).toEqual(response.user);
  view.unmount();
  const utils = renderHook(() => useUser(), { wrapper: UserProvider });
  expect(utils.result.current.user).toEqual(response.user);
  act(() => utils.result.current.logout());
  expect(utils.result.current.user).toBeNull();
  expect(sessionStorage.getItem('token')).toBeNull();
  expect(localStorage.getItem('user')).toBeNull();
});

test('a saved user without a token does not become an authenticated session', () => {
  localStorage.setItem('user', JSON.stringify({ id: 1 }));
  const view = renderHook(() => useUser(), { wrapper: UserProvider });
  expect(view.result.current.user).toBeNull();
});

test('invalid saved JSON does not crash the app', () => {
  sessionStorage.setItem('token', 'test-token');
  sessionStorage.setItem('user', 'broken-json');
  const view = renderHook(() => useUser(), { wrapper: UserProvider });
  expect(view.result.current.user).toBeNull();
});
