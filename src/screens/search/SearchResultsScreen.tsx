import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Header from '../../components/shared/Header';
import CustomTextInput from '../../components/shared/CustomTextInput';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import ContentContainer from '../../components/shared/ContentContainer';
import CustomText from '../../components/shared/CustomText';
import BookCover from '../../components/shared/BookCover';
import { useQuery } from '@tanstack/react-query';
import { getBookByQuery } from '../../components/book/service/BookService';
import { useRoute } from '@react-navigation/native';
import ErrorNotification from '../../components/shared/ErrorNotification';

export default function SearchResultsScreen() {
  const router = useRoute();
  const query = router.params;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['bookDetails', query],
    queryFn: () => getBookByQuery(query!.toString()),
  });

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header showTopBar headerHeight={250}>
        <View style={styles.searchBarContainer}>
          <CustomTextInput
            iconName='search-outline'
            label=''
            placeholder='Zoek'
            style={styles.searchBar}
          />
        </View>
        <CustomText text='Alle boeken' style={styles.pageTitle} />
      </Header>
      <ContentContainer>
        {isLoading && (
          <ActivityIndicator
            size='small'
            color={colors.WHITE}
            testID='loading-indicator'
          />
        )}
        {isError && (
          <>
            <ErrorNotification errorMessage='Geen boeken gevonden' />
          </>
        )}
        {!isError &&
          data?.data.books.map((b) => (
            <View style={styles.bookContainer} key={b.id}>
              <BookCover imageUrl={b.thumbnail} />
              <View style={styles.bookDetails}>
                <CustomText
                  text={b.title}
                  style={{ color: 'black', fontSize: 26 }}
                />
                <CustomText
                  text={b.author}
                  style={{ color: 'black', fontSize: 18 }}
                />
                <CustomText
                  text={b.description || 'No description'}
                  style={{ color: 'black', fontSize: 12 }}
                  numberOfLines={3}
                />
              </View>
            </View>
          ))}
      </ContentContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.THEME_WHITE,
  },
  searchBarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: '90%',
  },
  pageTitle: {
    flex: 1,
    position: 'absolute',
    top: 150,
    height: 150,
    marginHorizontal: 16,
    fontSize: 36,
  },
  //BOOKCONTAINER
  bookContainer: {
    marginBottom: 10,
    backgroundColor: colors.INPUT_GREY,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  bookDetails: {
    marginVertical: 5,
    gap: 5,
    flex: 1,
  },
});
