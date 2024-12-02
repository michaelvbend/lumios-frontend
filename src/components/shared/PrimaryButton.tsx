import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import CustomText from './CustomText';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  isLoading?: boolean;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
      <View style={[styles.container, props.style]}>
        {props.isLoading ? (
          <ActivityIndicator size="small" color={colors.WHITE} />
        ) : (
          <CustomText text={props.text} style={props.textStyle} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_COLOR_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 15,
  },
});
