import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useContext, useEffect, useState } from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from './assets/color-scheme/COLOR_PALLET';
import CustomStatusBar from './src/components/shared/CustomStatusbar';
import BookScreen from './src/screens/book/BookScreen';
import SearchResultsScreen from './src/screens/search/SearchResultsScreen';
import SwipeScreen from './src/screens/swipe/SwipeScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import LoginScreen from './src/screens/auth/login/LoginScreen';
import AuthContextProvider, { AuthContext } from './src/store/auth-context';
import { RootStackParamList } from './src/types/Navigation';
import { pickImageCamera } from './src/components/vision/BookVision';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const client = new QueryClient();
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setIsLoggingIn(true);
  }, []);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [fontsLoaded] = useFonts({
    Circular: require('./assets/fonts/CircularStd-Bold.otf'),
    CircularBook: require('./assets/fonts/CircularStd-Book.otf'),
    CircularItalic: require('./assets/fonts/CircularStd-BookItalic.otf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const Tab = createBottomTabNavigator();
  function BottomTabNavigation() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    async function navigateToBookByVision() {
      console.log('OPENQR');
      pickImageCamera().then((bookId) => {
        navigation.navigate('BookScreen', { bookId });
      });
    }
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopWidth: 0,
            borderTopRightRadius: 20,
            position: 'absolute',
          },

          tabBarLabelStyle: {
            fontFamily: 'CircularBook',
          },
          tabBarActiveTintColor: colors.PRIMARY_COLOR_GREEN,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Boeken':
                iconName = focused ? 'book' : 'book-outline';
                break;
              case 'Club':
                iconName = focused ? 'people' : 'people-outline';
                break;
              case 'Instellingen':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Boeken' component={SearchResultsScreen} />
        <Tab.Screen name='Club' component={HomeScreen} />
        <Tab.Screen name='Instellingen' component={HomeScreen} />
      </Tab.Navigator>
    );
  }

  function Root() {
    const authContext = useContext(AuthContext);
    useEffect(() => {
      async function checkStorage() {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            authContext.login(token);
          }
          setIsLoggingIn(false);
        } catch (error) {
        } finally {
          if (!isLoggingIn) {
            await SplashScreen.hideAsync();
          }
        }
      }
      checkStorage();
    }, []);
    return <Navigation />;
  }
  function Navigation() {
    const authContext = useContext(AuthContext);

    return (
      <NavigationContainer>
        <CustomStatusBar>
          <Stack.Navigator
            screenOptions={{
              autoHideHomeIndicator: true,
              headerShown: false,
              contentStyle: { backgroundColor: colors.THEME_WHITE },
            }}
          >
            {!authContext.isLoggedIn && (
              <Stack.Screen name='Signin' component={LoginScreen} />
            )}
            {authContext.isLoggedIn && (
              <>
                <Stack.Screen name='Lumios' component={BottomTabNavigation} />
                {/* <Stack.Screen name="AllBooksScreen" component={AllBooksScreen} /> */}
                <Stack.Screen
                  name='BookScreen'
                  component={BookScreen}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: colors.PRIMARY_COLOR_GREEN,
                    },
                    title: 'Boekdetails',
                    headerTitleStyle: { fontFamily: 'Circular' },
                    headerTintColor: colors.THEME_WHITE,
                  }}
                />
                <Stack.Screen
                  name='SwipeScreen'
                  component={SwipeScreen}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: colors.PRIMARY_COLOR_GREEN,
                    },
                    title: 'Swipe',
                    headerTitleStyle: { fontFamily: 'Circular' },
                    headerTintColor: colors.THEME_WHITE,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </CustomStatusBar>
      </NavigationContainer>
    );
  }

  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    width: 200,
    marginBottom: 10,
  },

  modalText: {
    color: 'black',
    fontFamily: 'CircularBook',
  },
  logo: {
    marginTop: 10,
    marginLeft: 15,
  },
});
