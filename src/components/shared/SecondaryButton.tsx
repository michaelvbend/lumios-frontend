import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import CustomText from './CustomText';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

interface SecondaryButtonProps {
  text?: string;
  onPress?: () => void;
  style?: object;
  textStyle?: object;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
}

export default function SecondaryButton(props: SecondaryButtonProps) {
  return (
    <Pressable onPress={props.onPress}>
      <View style={[styles.container, props.style]}>
        {props.iconName && (
          <Ionicons name={props.iconName} size={props.iconSize} color={props.iconColor} />
        )}
        <CustomText text={props.text} style={props.textStyle} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.SECONDARY_COLOR_GREY_DARK,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 5,
    flexDirection: 'row',
  },
});
