import { useRef } from 'react';
import { Image, StyleSheet, View, PanResponder, Animated } from 'react-native';

import CustomText from './CustomText';
interface BookCoverProps {
  imageUrl: string;
  size?: 'thumbnail' | 'large';
}

export default function BookCover({ imageUrl, size }: BookCoverProps) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <View
      style={
        size === 'large' ? styles.bookImageLargeContainer : styles.bookImageThumbnailContainer
      }>
      <CustomText text="Niets te zien hier!" style={styles.easterEgg} />
      <Animated.View
        {...(size === 'large' ? panResponder.panHandlers : {})}
        style={size === 'large' ? [pan.getLayout()] : {}}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode="stretch"
          style={size === 'large' ? styles.bookImageLarge : styles.bookImageThumbnail}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookImageThumbnailContainer: {
    width: 100,
    borderRadius: 15,
    height: 150,
    marginHorizontal: 5,
  },
  bookImageLargeContainer: {
    width: 200,
    borderRadius: 15,
    height: 300,
  },
  bookImageThumbnail: {
    width: '100%',
    borderRadius: 15,
    height: '100%',
  },
  bookImageLarge: {
    width: '100%',
    borderRadius: 15,
    height: '100%',
  },
  easterEgg: {
    fontFamily: 'CircularBook',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    top: 50,
  },
});
