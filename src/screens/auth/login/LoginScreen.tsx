import { Image, Platform, StyleSheet, View } from 'react-native';
import LoginForm from '../../../components/auth/LoginForm';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          resizeMode="contain"
          source={require('../../../../assets/logos/black-logo.png')}
        />
      </View>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop: Platform.OS === 'android' ? 50 : 0,
  },
});
