import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

interface PrimaryButtonProps {
  style?: object;
  text: string;
  testID?: string;
  numberOfLines?: number;
}

export default function CustomText(props: PrimaryButtonProps) {
  return (
    <Text
      style={[styles.text, props.style]}
      testID={props.testID}
      numberOfLines={props.numberOfLines ? props.numberOfLines : 5}
      ellipsizeMode="tail">
      {props.text}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.THEME_WHITE,
    fontFamily: 'Circular',
  },
});
