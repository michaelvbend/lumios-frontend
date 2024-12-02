import { useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
} from 'react-native';

import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import WelcomeWidget from '../../components/account/WelcomeWidget';
import TrendingBooks from '../../components/book/TrendingBooks';
import ContentContainer from '../../components/shared/ContentContainer';
import CustomTextInput from '../../components/shared/CustomTextInput';
import Header from '../../components/shared/Header';
import PrimaryButton from '../../components/shared/PrimaryButton';
import SecondaryButton from '../../components/shared/SecondaryButton';
import CustomText from '../../components/shared/CustomText';
import { AuthContext } from '../../store/auth-context';
import Menu from '../../components/menu/Menu';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/Navigation';
import BookEvents from '../../components/event/BookEvents';

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) {
  const authContext = useContext(AuthContext);
  function handleLogout() {
    authContext.logout();
  }

  function searchHandler(
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) {
    navigation.navigate('SearchResults', event.nativeEvent.text);
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header showTopBar>
        <View style={styles.searchBarContainer}>
          <CustomTextInput
            iconName='search-outline'
            label=''
            placeholder='Zoek'
            style={styles.searchBar}
            onSubmit={searchHandler}
          />
        </View>
      </Header>
      <WelcomeWidget />
      <ContentContainer>
        <Menu />
        <TrendingBooks />
        <BookEvents />
      </ContentContainer>
      <PrimaryButton text='Logout' onPress={handleLogout} />
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
});
