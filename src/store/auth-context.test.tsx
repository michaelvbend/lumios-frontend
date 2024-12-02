import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContextProvider, { AuthContext } from './auth-context';
import { Button, Text } from 'react-native';

jest.mock('@react-native-async-storage/async-storage');

describe('AuthContextProvider', () => {
  let getByText;
  let getByPlaceholderText: unknown;

  beforeEach(() => {
    jest.clearAllMocks();
    const renderResult = render(
      <AuthContextProvider>
        <AuthContext.Consumer>
          {(value) => (
            <>
              <Text>{value.token}</Text>
              <Text>{value.isLoggedIn ? 'Logged In' : 'Logged Out'}</Text>
              <Button onPress={() => value.login('fake-token')} title="Login" />
              <Button onPress={value.logout} title="Logout" />
            </>
          )}
        </AuthContext.Consumer>
      </AuthContextProvider>,
    );
    getByText = renderResult.getByText;
    getByPlaceholderText = renderResult.getByPlaceholderText;
  });

  it('renders the component', () => {
    // expect(getByText('')).toBeTruthy();
    expect(getByText('Logged Out')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('handles login', async () => {
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('fake-token')).toBeTruthy();
      expect(getByText('Logged In')).toBeTruthy();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    });
  });

  it('handles logout', async () => {
    fireEvent.press(getByText('Login'));
    fireEvent.press(getByText('Logout'));

    await waitFor(() => {
      expect(getByText('')).toBeTruthy();
      expect(getByText('Logged Out')).toBeTruthy();
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
});
