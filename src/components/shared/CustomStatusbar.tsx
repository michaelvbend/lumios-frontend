// statusbar.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

type CustomStatusBarProps = {
  children: React.ReactNode;
  statusBgColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  bgColor?: string;
};

export default function CustomStatusBar({
  children,
  statusBgColor = colors.PRIMARY_COLOR_GREEN,
  barStyle = 'light-content',
  bgColor = colors.THEME_WHITE,
}: CustomStatusBarProps) {
  return (
    <>
      <StatusBar backgroundColor={statusBgColor} barStyle={barStyle} />
      <SafeAreaView style={{ flex: 0, backgroundColor: statusBgColor }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>{children}</SafeAreaView>
    </>
  );
}
