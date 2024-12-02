import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { LoginRequest } from './LoginForm.interface';
import login from './service/LoginService';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import { AuthContext } from '../../store/auth-context';
import { AuthResponse } from '../../types/Auth';
import CustomText from '../shared/CustomText';
import CustomTextInput from '../shared/CustomTextInput';
import ErrorNotification from '../shared/ErrorNotification';
import GoogleSignin from '../shared/GoogleSignIn';
import Link from '../shared/Link';
import PrimaryButton from '../shared/PrimaryButton';
import { useMutation } from '@tanstack/react-query';

export default function LoginForm() {
  const authContext = useContext(AuthContext);
  const [loginRequest, setLoginRequest] = useState({} as LoginRequest);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (loginRequest: LoginRequest) => login(loginRequest),
    onSuccess: (response: AuthResponse) => {
      authContext.login(response.data.token);
    },
  });

  function handleEmailInput(value: string) {
    setLoginRequest((currentState: LoginRequest) => ({
      ...currentState,
      email: value,
    }));
  }

  function handlePasswordInput(value: string) {
    setLoginRequest((currentState: LoginRequest) => ({
      ...currentState,
      password: value,
    }));
  }

  function handleLogin() {
    mutate(loginRequest);
  }

  return (
    <View style={styles.container}>
      <CustomText text="Inloggen" style={styles.title} />
      <View style={styles.formContainer}>
        {isError && <ErrorNotification errorMessage="Er is iets misgegaan" />}
        <CustomTextInput label="Email" placeholder="Email" onChangeText={handleEmailInput} />
        <CustomTextInput
          label="Wachtwoord"
          placeholder="Wachtwoord"
          secureTextEntry
          onChangeText={handlePasswordInput}
        />
        <Link
          text="Wachtwoord vergeten"
          textStyle={styles.forgetPasswordLink}
          onPress={() => console.log('PLACEHOLDER')}
        />
      </View>
      <PrimaryButton
        text="Log in"
        style={styles.loginButton}
        onPress={handleLogin}
        isLoading={isPending}
      />
      <View style={styles.otherLoginOptionContainer}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)', 'transparent']}
          style={styles.gradientLine}
        />
        <CustomText text="Of login met" style={styles.otherLoginOption} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)', 'transparent']}
          style={styles.gradientLine}
        />
      </View>
      <GoogleSignin />
      <View style={styles.registerSection}>
        <CustomText style={styles.registerIntroText} text="Heb je nog geen account? " />
        <CustomText style={styles.registerActionText} text="Registreer nu" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    marginVertical: 20,
  },
  title: {
    color: colors.TEXT_COLOR,
    fontFamily: 'Circular',
    fontSize: 42,
  },
  loginButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forgetPasswordLink: {
    color: colors.THEME_GREY,
    textAlign: 'right',
    fontFamily: 'CircularBook',
  },
  otherLoginOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  gradientLine: {
    flex: 1,
    height: 1,
  },
  otherLoginOption: {
    color: colors.TEXT_COLOR,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  registerSection: {
    marginTop: 30,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  registerIntroText: {
    color: colors.TEXT_COLOR,
  },
  registerActionText: {
    color: colors.PRIMARY_COLOR_GREEN,
  },
});
