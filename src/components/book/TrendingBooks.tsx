import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { getTopFiveBooks } from './service/BookService';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

import BookCover from '../shared/BookCover';
import CustomText from '../shared/CustomText';
import ErrorNotification from '../shared/ErrorNotification';
import { useQuery } from '@tanstack/react-query';
import { RootStackParamList } from '../../types/Navigation';

export default function TrendingBooks({}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['trendingBooks'],
    queryFn: getTopFiveBooks,
  });

  function navigateToBook(bookId: string) {
    navigation.navigate('BookScreen', { bookId });
  }
  const trendingBooks = data?.data.books || [];

  if (isLoading) {
    return (
      <ActivityIndicator
        size='small'
        color={colors.WHITE}
        testID='loading-indicator'
      />
    );
  }

  return (
    <View style={styles.trendingBooksContainer}>
      <CustomText text='Trending boeken' style={styles.containerTitle} />
      {isError && (
        <ErrorNotification
          errorMessage='Er ging iets fout.'
          testID='error-message'
        />
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {trendingBooks.map((book) => {
          return (
            <Pressable
              style={styles.bookContainer}
              key={book.id}
              onPress={() => navigateToBook(book.id)}
            >
              <BookCover imageUrl={book.thumbnail} />
              <CustomText
                text={book.title}
                style={[styles.bookInfo, { color: colors.TEXT_COLOR }]}
                testID='book-title'
                numberOfLines={1}
              />
              <CustomText
                text={book.author}
                style={[
                  styles.bookInfo,
                  { color: colors.PRIMARY_COLOR_GREEN_DARK },
                ]}
                numberOfLines={1}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  trendingBooksContainer: {
    marginVertical: 20,
  },
  bookContainer: {
    width: 110,
    alignItems: 'center',
  },
  containerTitle: {
    color: colors.TEXT_COLOR,
    marginBottom: 10,
    fontSize: RFValue(20),
    marginLeft: 5,
  },
  bookInfo: {
    textAlign: 'center',
    width: '90%',
    marginHorizontal: 5,
    fontSize: RFValue(10),
  },
});
