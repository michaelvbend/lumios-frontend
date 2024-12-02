import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomText from './CustomText';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

interface SuccessNotificationProps {
  style: object;
  successMessage: string;
}

export default function SuccessNotification({ style, successMessage }: SuccessNotificationProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Ionicons name="md-checkmark-circle" size={16} color="white" style={styles.icon} />
        <CustomText text="Succes!" />
      </View>
      <CustomText style={styles.text} text={successMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_COLOR_GREEN_LIGHT,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontFamily: 'CircularBook',
    fontSize: 10,
  },
});
