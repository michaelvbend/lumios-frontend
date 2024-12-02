import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import CustomText from './CustomText';

interface LinkProps {
  text: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}

export default function Link(props: LinkProps) {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
      <View style={[styles.container, props.style]}>
        <CustomText text={props.text} style={props.textStyle} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});
