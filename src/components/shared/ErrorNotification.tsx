import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import CustomText from './CustomText';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

interface ErrorNotificationProps {
  errorMessage: string;
  style?: object;
  testID?: string;
}

export default function ErrorNotification(props: ErrorNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <View style={[styles.container, props.style]}>
      <View>
        <View style={styles.header}>
          <Ionicons name="bug" size={16} color="white" style={styles.icon} />
          <CustomText text="Oops!" />
        </View>
        <CustomText style={styles.text} text={props.errorMessage} testID={props.testID} />
      </View>
      <TouchableOpacity onPress={() => setIsVisible(false)}>
        <Ionicons name="close" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ERROR_COLOR,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 5,
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 5, // Adjust the margin as needed
  },
  text: {
    fontFamily: 'CircularBook',
    fontSize: 12,
  },
});
