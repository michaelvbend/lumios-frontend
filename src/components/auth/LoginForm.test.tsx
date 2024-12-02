import { render, fireEvent, waitFor } from '@testing-library/react-native';

import LoginForm from './LoginForm';
import login from './service/LoginService';
import { AuthContext } from '../../store/auth-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
jest.mock('./service/LoginService');

describe('LoginForm', () => {
  let getByText: Function;
  let getByPlaceholderText: Function;
  const mockAuthContext = {
    login: jest.fn(),
  };

  const renderWithQueryClient = (ui: unknown) => {
    return render(<QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const renderResult = renderWithQueryClient(
      <AuthContext.Provider value={mockAuthContext}>
        <LoginForm />
      </AuthContext.Provider>,
    );
    getByText = renderResult.getByText;
    getByPlaceholderText = renderResult.getByPlaceholderText;
  });

  it('renders the component', () => {
    expect(getByText('Inloggen')).toBeTruthy();
    expect(getByText('Log in')).toBeTruthy();
    expect(getByText('Wachtwoord vergeten')).toBeTruthy();
    expect(getByText('Of login met')).toBeTruthy();
    expect(getByText('Heb je nog geen account?')).toBeTruthy();
  });

  it('handles login success', async () => {
    (login as jest.Mock).mockResolvedValue({ data: { token: 'fake-token' } });

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Wachtwoord'), 'password123');
    fireEvent.press(getByText('Log in'));

    await waitFor(() => {
      expect(mockAuthContext.login).toHaveBeenCalledWith('fake-token');
    });
  });

  it('handles login with error when password is empty', async () => {
    (login as jest.Mock).mockResolvedValue({ data: { token: 'fake-token' } });

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.press(getByText('Log in'));

    await waitFor(() => {
      expect(mockAuthContext.login).not.toHaveBeenCalled();
    });
  });

  it('handles login with error when credentials do not return token', async () => {
    (login as jest.Mock).mockRejectedValue(new Error('Login failed'));

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Wachtwoord'), 'password123');

    fireEvent.press(getByText('Log in'));

    await waitFor(() => {
      expect(getByText('Er is iets misgegaan')).toBeTruthy();
    });
  });
});
