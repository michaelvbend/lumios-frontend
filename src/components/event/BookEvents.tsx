import { StyleSheet, View } from 'react-native';
import CustomText from '../shared/CustomText';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import { RFValue } from 'react-native-responsive-fontsize';
import BookEvent from './BookEvent';

export default function BookEvents() {
  const MOCK_EVENTS = [
    {
      title: 'Frontaal leren',
      organizer: 'TaalNL',
      date: '26-12',
    },
    {
      title: 'Boekenweek Nederland',
      organizer: 'Nederlandse Taal',
      date: '11-02',
    },
  ];
  return (
    <View>
      <CustomText text='Events' style={styles.containerTitle} />
      {MOCK_EVENTS.map((event) => (
        <BookEvent key={event.title} event={event} />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  containerTitle: {
    color: colors.TEXT_COLOR,
    marginBottom: 10,
    fontSize: RFValue(20),
    marginLeft: 5,
  },
});
