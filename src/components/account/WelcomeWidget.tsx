import { ImageBackground, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

import CustomText from '../shared/CustomText';
import SecondaryButton from '../shared/SecondaryButton';

export default function WelcomeWidget() {
  return (
    <View style={styles.recContainer}>
      <ImageBackground
        source={require('./../../../assets/bookBackground.jpg')}
        resizeMode='cover'
        style={styles.bookImage}
        borderRadius={15}
      >
        <View style={styles.innerContainer}>
          <View style={styles.textContainer}>
            <CustomText
              text='Welkom terug, Michael'
              style={styles.welcomeHeader}
              numberOfLines={2}
            />
          </View>
          <View style={styles.topMenuContainer}>
            <SecondaryButton
              iconName='bookmark'
              iconColor={colors.THEME_WHITE}
              iconSize={16}
              text='Leeslijst'
              style={[
                { backgroundColor: colors.SECONDARY_COLOR_GREEN_DARK },
                styles.topMenuButton,
              ]}
            />
            <SecondaryButton
              iconName='notifications'
              iconColor={colors.THEME_WHITE}
              iconSize={16}
              text='Taken (1)'
              style={[
                { backgroundColor: colors.PRIMARY_COLOR_GREEN },
                styles.topMenuButton,
              ]}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  recContainer: {
    flex: 1,
    position: 'absolute',
    top: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    borderRadius: 15,

    width: '92%',
    marginHorizontal: 16,

    backgroundColor: colors.PRIMARY_COLOR_GREEN_DARK,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0, 0.40)',
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  welcomeHeader: {
    fontSize: RFValue(18),
  },
  welcomeSubText: {
    marginTop: 10,
    fontFamily: 'CircularItalic',
    fontSize: RFValue(14),
  },
  bookImage: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 15,
  },

  topMenuButton: {
    gap: 20,
    justifyContent: 'space-around',
  },
  topMenuContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
  },
});
