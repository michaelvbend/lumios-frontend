import { Image, Pressable, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../types/Navigation';
import CustomText from '../shared/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { images, MenuItemProps } from './Menu.interface';

export default function MenuItem({ menuItem }: { menuItem: MenuItemProps }) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function onPressHandler() {
    navigation.navigate(menuItem.navigateTo);
  }

  return (
    <>
      <Pressable
        onPress={onPressHandler}
        style={[styles.container, { backgroundColor: menuItem.color }]}>
        <Image source={images[menuItem.id]} style={styles.image} resizeMode="contain" />
        <CustomText text={menuItem.title} style={styles.menuItemLabel} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 40,
    height: 40,
  },
  menuItemLabel: {
    fontSize: RFValue(12),
  },
});
