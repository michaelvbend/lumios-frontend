import { render } from '@testing-library/react-native';
import WelcomeWidget from './WelcomeWidget';

describe('WelcomeWidget', () => {
  it('renders correctly', () => {
    const { getByText } = render(<WelcomeWidget />);

    expect(getByText('Welkom terug, Michael')).toBeTruthy();
    expect(getByText('Leeslijst')).toBeTruthy();
    expect(getByText('Taken (1)')).toBeTruthy();
  });
});
