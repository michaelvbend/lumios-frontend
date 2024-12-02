import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';

import CustomText from './CustomText';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

interface CustomTextInputProps {
  label: string;
  placeholder: string;
  onSubmit?: (
    arg: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  onChangeText?: (arg: string) => void;
  secureTextEntry?: boolean;
  style?: object;
  iconName?: string;
}

export default function CustomTextInput({
  label,
  placeholder,
  onSubmit,
  onChangeText,
  secureTextEntry,
  style,
  iconName,
}: CustomTextInputProps) {
  return (
    <View style={[styles.container, style]}>
      <CustomText text={label} style={styles.label} />
      <View style={styles.inputContainer}>
        {iconName && (
          <Ionicons name={iconName} size={24} color={colors.THEME_GREY} />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmit}
          onChangeText={onChangeText}
          autoCapitalize='none'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.INPUT_GREY,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    paddingLeft: 10,
  },
  label: {
    color: colors.TEXT_COLOR,
    marginBottom: 10,
  },
});
