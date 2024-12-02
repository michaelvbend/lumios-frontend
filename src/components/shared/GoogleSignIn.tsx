import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomText from './CustomText';

interface GoogleSigninProps {
  style?: object;
}

export default function GoogleSignin(props: GoogleSigninProps) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.header}>
        <Ionicons name="logo-google" size={16} color="white" style={styles.icon} />
        <CustomText text="Google SSO" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4285F4',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontFamily: 'CircularBook',
    fontSize: 10,
    color: '#4285F4',
  },
});
