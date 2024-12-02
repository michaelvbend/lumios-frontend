import { StyleSheet, View } from 'react-native';
import CustomText from '../shared/CustomText';
import SecondaryButton from '../shared/SecondaryButton';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

interface BookEventProps {
  date: string;
  title: string;
  organizer: string;
}

export default function BookEvent({ event }: { event: BookEventProps }) {
  return (
    <View style={styles.eventContainer}>
      <CustomText text={event.date} style={styles.eventDateText} />
      <View>
        <CustomText text={event.title} style={styles.eventTitle} />
        <CustomText
          text={`Door: ${event.organizer}`}
          style={styles.eventOrganizerText}
        />
      </View>
      <SecondaryButton
        iconName='link'
        iconColor={colors.TEXT_COLOR}
        iconSize={20}
        style={styles.iconStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: colors.INPUT_GREY,
    padding: 10,
    borderRadius: 15,
    gap: 20,
    marginBottom: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  eventTitle: {
    color: colors.TEXT_COLOR,
    textAlign: 'left',
  },
  eventDateText: {
    backgroundColor: colors.THEME_GREY,
    padding: 10,
    borderRadius: 15,
  },
  eventOrganizerText: {
    color: colors.TEXT_COLOR,
    fontFamily: 'CircularItalic',
  },
  iconStyle: {
    backgroundColor: colors.INPUT_GREY,
    marginLeft: 15,
  },
});
