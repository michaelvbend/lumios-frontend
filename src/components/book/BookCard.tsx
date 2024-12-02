import { Image, StyleSheet, View } from 'react-native';
import CustomText from '../shared/CustomText';
import SecondaryButton from '../shared/SecondaryButton';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import { memo } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Book } from '../../types/Book';

function BookCard({ book, onTurnBook }: { book: Book; onTurnBook: () => void }) {
  const handleOnPress = () => {
    onTurnBook();
  };

  return (
    <>
      <View style={styles.ratingEclipse}>
        <Ionicons name="star" size={15} color="white" />
        <CustomText text="4.5" />
      </View>
      <Image source={{ uri: book.thumbnail }} resizeMode="stretch" style={styles.bookImageLarge} />
      <SecondaryButton
        iconName="caret-up-circle-outline"
        iconColor="white"
        iconSize={20}
        text="Korte beschrijving"
        style={styles.imageInfoButton}
        onPress={() => handleOnPress()}
      />
    </>
  );
}
export default memo(BookCard);

const styles = StyleSheet.create({
  bookImageLarge: {
    width: '100%',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    height: '92%',
  },
  imageInfoButton: {
    position: 'absolute',
    width: '100%',
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    backgroundColor: colors.TEXT_COLOR,
    gap: 10,
  },
  ratingEclipse: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.SECONDARY_COLOR_BLUE_DARK,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 10,
    right: -10,
    top: -10,
    padding: 20,
  },
});
