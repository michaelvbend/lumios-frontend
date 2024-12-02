import { StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import CustomText from '../shared/CustomText';
import { Book, BookDetails, BooksResponse } from '../../types/Book';

export default function BookSummary({ book }: { book: BookDetails }) {
  const author = book.author || 'Niet beschikbaar';
  const genre = book.genre || 'Niet beschikbaar';
  const description = book.description || 'Niet beschikbaar';
  return (
    <View>
      <CustomText text={book.title} style={styles.bookTitle} />

      <CustomText
        text='Specificaties'
        style={styles.bookDescriptionTitle}
        numberOfLines={3}
      />
      <View>
        <CustomText text={`Hoofdauteur: ${author}`} style={styles.bookSpec} />
        <CustomText text={`Genre: ${genre}`} style={styles.bookSpec} />
      </View>
      <CustomText
        text='Samenvatting'
        style={styles.bookDescriptionTitle}
        numberOfLines={1}
      />
      <CustomText
        text={description || 'Geen samenvatting beschikbaar'}
        style={styles.bookDescription}
        numberOfLines={999}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  bookTitle: {
    color: colors.PRIMARY_COLOR_GREEN,
    marginTop: 10,
    fontFamily: 'Circular',
    fontSize: RFValue(24),
  },
  bookDescriptionTitle: {
    color: colors.PRIMARY_COLOR_GREEN,
    marginVertical: 10,
  },
  bookDescription: {
    fontFamily: 'CircularBook',
    color: colors.TEXT_COLOR,
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  bookSpec: {
    fontFamily: 'CircularItalic',
    color: colors.TEXT_COLOR,
    lineHeight: 15,
    marginBottom: 10,
  },
});
