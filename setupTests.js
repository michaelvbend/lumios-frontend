jest.mock('expo-font', () => ({
  useFonts: jest.fn().mockReturnValue([true]),
}));

jest.mock('expo-linear-gradient', () => {
  return {
    LinearGradient: () => null,
  };
});
jest.mock('@expo/vector-icons/Ionicons', () => {
  const MockIonicons = () => null;
  return MockIonicons;
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn().mockResolvedValue(null),
  preventAutoHideAsync: jest.fn().mockResolvedValue(null),
}));
