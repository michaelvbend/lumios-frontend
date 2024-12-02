import { StyleSheet, View } from 'react-native';
import CustomText from '../shared/CustomText';
import MenuItem from './MenuItem';
import { menuItems } from './Menu.interface';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import { RFValue } from 'react-native-responsive-fontsize';

export default function Menu() {
  return (
    <View>
      <CustomText text="Menu" style={styles.containerTitle} />
      <View style={styles.flatListContent}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} menuItem={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTitle: {
    color: colors.TEXT_COLOR,
    marginVertical: 10,
    fontSize: RFValue(20),
    marginLeft: 5,
  },
  flatListContent: {
    flexDirection: 'row',
  },
});
