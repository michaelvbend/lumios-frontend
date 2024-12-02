import Ionicons from '@expo/vector-icons/Ionicons';

import { useQuery } from '@tanstack/react-query';
import { getTopFiveBooks } from './service/BookService';
import { Book } from '../../types/Book';
import {
  ActivityIndicator,
  Animated,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import SecondaryButton from '../shared/SecondaryButton';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import CustomText from '../shared/CustomText';
import {
  SWIPE_OUT_DISTANCE,
  SWIPE_OUT_DURATION,
  SWIPE_THRESHOLD,
} from './SwipeBook.constants';
import BookCard from './BookCard';
import { TurnDirection } from '../../types/Swipe';

export default function SwipeBook() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['swipeBook'],
    queryFn: getTopFiveBooks,
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [bookTurned, setBookTurned] = useState(false);
  const [turnDirection, setTurnDirection] = useState<TurnDirection>(
    TurnDirection.NEUTRAL
  );

  useEffect(() => {
    if (data?.data.books) {
      setBooks(data.data.books);
    }
  }, [data]);

  useEffect(() => {
    // Reset the swipe animation whenever the books array changes
    swipe.setValue({ x: 0, y: 0 });
  }, [books]);

  const handleBookTurned = useCallback(() => {
    setBookTurned((prevState) => !prevState);
  }, []);

  const swipe = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        setBookTurned(false);
        determineTurnDirection(dx);
        swipe.setValue({ x: dx, y: 0 });
      },
      onPanResponderRelease: (_, { dx }) => {
        setTurnDirection(TurnDirection.NEUTRAL);
        const direction = Math.sign(dx);
        const isSwipedOffScreen = Math.abs(dx) > SWIPE_THRESHOLD;
        if (isSwipedOffScreen) {
          Animated.timing(swipe, {
            duration: SWIPE_OUT_DURATION,
            toValue: {
              x: direction * SWIPE_OUT_DISTANCE,
              y: SWIPE_OUT_DISTANCE,
            },
            useNativeDriver: true,
          }).start(removeTopCard);
          return;
        }
        Animated.spring(swipe.x, {
          toValue: 0,
          useNativeDriver: true,
          friction: 5,
        }).start();
      },
    })
  ).current;

  const removeTopCard = () => {
    setBooks((prevState) => prevState.slice(1));
    setTurnDirection(TurnDirection.NEUTRAL);
  };

  const handleChoice = (direction: number) => {
    setBookTurned(false);
    setTurnDirection(direction);
    Animated.timing(swipe, {
      duration: SWIPE_OUT_DURATION,
      toValue: {
        x: direction * SWIPE_OUT_DISTANCE,
        y: SWIPE_OUT_DISTANCE,
      },
      useNativeDriver: true,
    }).start(removeTopCard);
  };

  const determineTurnDirection = (xPosition: number) => {
    if (xPosition > SWIPE_THRESHOLD) {
      setTurnDirection(TurnDirection.LIKE);
    }
    if (xPosition < -SWIPE_THRESHOLD) {
      setTurnDirection(TurnDirection.DISLIKE);
    }
  };
  console.log(swipe.x, 'end');
  if (isLoading) {
    return (
      <ActivityIndicator
        size='large'
        color={colors.WHITE}
        testID='loading-indicator'
        style={styles.loadingOverlay}
      />
    );
  }

  if (isError || books.length === 0) {
    return (
      <View style={[styles.bookImageLargeContainer, styles.emptyBooksOverlay]}>
        <CustomText
          text='Er zijn vandaag geen boeken meer beschikbaar om te swipen. Probeer het morgen opnieuw.'
          numberOfLines={3}
          style={styles.emptyBooksOverlayText}
        />
      </View>
    );
  }

  return (
    <>
      {books
        .slice()
        .map((book, index) => {
          const isCurrentBook = index === 0;
          return (
            <Animated.View
              key={book.id}
              {...(isCurrentBook ? panResponder.panHandlers : {})}
              style={[
                styles.bookImageLargeContainer,
                {
                  transform: isCurrentBook
                    ? [{ translateX: swipe.x }, { translateY: 0 }]
                    : [],
                },
              ]}
            >
              <BookCard book={book} onTurnBook={handleBookTurned} />

              {turnDirection === TurnDirection.LIKE && isCurrentBook && (
                <View style={styles.directionOverlay}>
                  <Ionicons
                    name='heart'
                    size={150}
                    color={colors.PRIMARY_COLOR_GREEN}
                  />
                </View>
              )}
              {turnDirection === TurnDirection.DISLIKE && isCurrentBook && (
                <View style={styles.directionOverlay}>
                  <Ionicons
                    name='close'
                    size={150}
                    color={colors.ERROR_COLOR}
                  />
                </View>
              )}

              {bookTurned && (
                <View style={styles.overlay}>
                  <CustomText
                    numberOfLines={99}
                    text={book.description || 'N/A'}
                  />
                </View>
              )}
            </Animated.View>
          );
        })
        .reverse()}

      <View style={styles.optionButtonContainer}>
        <SecondaryButton
          iconName='close'
          iconSize={36}
          iconColor={colors.ERROR_COLOR}
          style={styles.optionButton}
          onPress={() => handleChoice(TurnDirection.DISLIKE)}
        />
        <SecondaryButton
          iconName='heart'
          iconSize={36}
          iconColor={colors.PRIMARY_COLOR_GREEN}
          style={styles.optionButton}
          onPress={() => handleChoice(TurnDirection.LIKE)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookImageLargeContainer: {
    position: 'absolute',
    top: 120,
    width: '75%',
    height: '65%',
    borderRadius: 15,
    marginVertical: -20,
    marginHorizontal: '12%',
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

  optionButtonContainer: {
    flex: 1,
    marginTop: 500,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  optionButton: {
    borderRadius: 15,
    padding: 15,
    backgroundColor: colors.INPUT_GREY,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBooksOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  emptyBooksOverlayText: {
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    padding: 30,
    overflow: 'scroll',
    height: '92%',
  },
  directionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: '92%',
  },
});
