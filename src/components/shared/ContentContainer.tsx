import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ContentContainerProps {
  children: React.ReactNode;
}

export default function ContentContainer({ children }: ContentContainerProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,
  },
});
