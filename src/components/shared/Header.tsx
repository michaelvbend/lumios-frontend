import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import { pickImageCamera } from '../vision/BookVision';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/Navigation';
import { BooksResponse } from '../../types/Book';

const screenWidth = Dimensions.get('window').width;

export default function Header({
  children,
  headerHeight = 300,
  showTopBar = false,
}) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const svgMarkup = `
    <svg viewBox="0 0 375 1156" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <g>
        <path d="M0 119C0 96.9086 17.9086 79 40 79H335H336C357.539 79 375 61.5391 375 40V1156H0V119Z" fill="#0ea47a"/>
      </g>
    </svg>
  `;

  async function navigateToBookByVision() {
    pickImageCamera().then((books: BooksResponse) => {
      navigation.navigate('BookScreen', { bookId: books.books[0].id });
    });
  }

  return (
    <View style={styles.container}>
      <View style={[styles.svgContainer, { height: headerHeight }]}>
        <SvgXml
          xml={svgMarkup}
          width={screenWidth}
          height='100%'
          style={styles.svgBackground}
        />
        {showTopBar ? (
          <>
            <Image
              source={require('../../../assets/logo-side.png')}
              resizeMode='contain'
              style={styles.logo}
            />
            <Pressable
              onPress={navigateToBookByVision}
              style={{ position: 'absolute', top: 10, right: 15 }}
            >
              <Ionicons
                name='qr-code-outline'
                size={30}
                color={colors.THEME_WHITE}
              />
            </Pressable>
          </>
        ) : null}

        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.THEME_WHITE,
  },
  svgContainer: {
    width: '100%',
  },
  svgBackground: {
    width: '100%',
    height: '100%',
    transform: [{ scaleX: -1 }, { scaleY: -1 }],
    position: 'absolute',
  },
  logo: {
    marginTop: 10,
    marginLeft: 15,
  },
});
