import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import BookSummary from '../../components/book/BookSummary';
import { getBookDetails } from '../../components/book/service/BookService';
import BookCover from '../../components/shared/BookCover';
import ContentContainer from '../../components/shared/ContentContainer';
import CustomText from '../../components/shared/CustomText';
import Header from '../../components/shared/Header';
import Link from '../../components/shared/Link';
import { BookDetailMenu, BookDetails } from '../../types/Book';
import { useQuery } from '@tanstack/react-query';

import { RouteProp } from '@react-navigation/native';

type BookScreenRouteProp = RouteProp<{ params: { bookId: string } }, 'params'>;

export default function BookScreen({ route }: { route: BookScreenRouteProp }) {
  const { bookId } = route.params;

  const [selectedTab, setSelectedTab] = useState(BookDetailMenu.DETAILS);
  const tabItems = Object.values(BookDetailMenu);
  const { data: book, isSuccess } = useQuery({
    queryKey: ['bookDetails', bookId],
    queryFn: async (): Promise<BookDetails> => {
      const booksResponse = await getBookDetails(bookId);
      return booksResponse.data;
    },
  });

  if (isSuccess) {
    return (
      <ScrollView style={styles.container} bounces={false}>
        <Header headerHeight={460}>
          <View style={styles.bookContainer}>
            <BookCover imageUrl={book.thumbnail} size='large' />
          </View>

          <View style={styles.bookSummary}>
            <View style={styles.bookDetail}>
              <View style={styles.bookDetailWithIcon}>
                <Ionicons
                  name='book'
                  size={24}
                  color={colors.PRIMARY_COLOR_GREEN_LIGHT}
                />
                <CustomText text={book.pageCount ?? 'N/A'} />
              </View>
              <CustomText text="Pagina's" style={styles.bookDetailLabel} />
            </View>
            <View style={styles.bookDetail}>
              <View style={styles.bookDetailWithIcon}>
                <Ionicons
                  name='calendar'
                  size={24}
                  color={colors.PRIMARY_COLOR_GREEN_LIGHT}
                />
                <CustomText
                  text={
                    book.publishedDate
                      ? book.publishedDate.split('-')[0]
                      : 'N/A'
                  }
                />
              </View>
              <CustomText text='Jaar' style={styles.bookDetailLabel} />
            </View>
            <View style={styles.bookDetail}>
              <View style={styles.bookDetailWithIcon}>
                <Ionicons
                  name='star'
                  size={24}
                  color={colors.PRIMARY_COLOR_GREEN_LIGHT}
                />
                <CustomText text={book.rating ?? 'N/A'} />
              </View>
              <CustomText text='Rating' style={styles.bookDetailLabel} />
            </View>
          </View>
        </Header>
        <ContentContainer>
          <View style={styles.tabMenu}>
            {tabItems.map((tabItem) => (
              <View key={tabItem}>
                <Link
                  textStyle={
                    tabItem === selectedTab
                      ? { color: colors.PRIMARY_COLOR_GREEN }
                      : { color: colors.TEXT_COLOR, opacity: 0.3 }
                  }
                  text={tabItem}
                  onPress={() => setSelectedTab(tabItem)}
                />
                {tabItem === selectedTab && (
                  <View style={styles.selectedTabUnderline} />
                )}
              </View>
            ))}
          </View>
          <View style={styles.menuTabUnderline} />
          <View style={styles.menuItem}>
            {selectedTab === BookDetailMenu.DETAILS ? (
              <BookSummary book={book} />
            ) : selectedTab === BookDetailMenu.REVIEWS ? (
              <CustomText text='Reviews' />
            ) : (
              <CustomText text='Aanbevolen boeken' />
            )}
          </View>
        </ContentContainer>
      </ScrollView>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.THEME_WHITE,
  },
  bookContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    margin: 20,
    borderRadius: 15,
    backgroundColor: `rgba(59, 59, 59, 0.7)`,
  },
  bookDetail: {
    alignItems: 'center',
    marginRight: 10,
    justifyContent: 'center',
  },
  bookDetailWithIcon: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookDetailLabel: {
    fontSize: 12,
    fontFamily: 'CircularBook',
    marginTop: 10,
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    marginVertical: -30,
  },

  menuTabUnderline: {
    height: 1,
    backgroundColor: colors.TEXT_COLOR,
    width: '100%',
    opacity: 0.3,
    marginTop: 30,
    zIndex: -1,
  },
  selectedTabUnderline: {
    height: 4,
    backgroundColor: colors.PRIMARY_COLOR_GREEN,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 15,
  },
  menuItem: {
    marginBottom: 60,
  },
});
