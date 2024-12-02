import { StyleSheet, View } from 'react-native';

import CustomText from '../shared/CustomText';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import { RFValue } from 'react-native-responsive-fontsize';
import { CommentComponent } from '../../types/BookActions';
import Comment from './Comment';

export default function Feed() {
  const mockComment: CommentComponent = {
    username: 'Master026',
    date: '26-08-1998',
    comment: 'Dit boek was echt helemaal ruk.',
    likes: 3,
    dislikes: 5,
  };

  return (
    <View style={styles.trendingBooksContainer}>
      <CustomText text='Feed' style={styles.containerTitle} />
      <Comment commentProps={mockComment} />
    </View>
  );
}

const styles = StyleSheet.create({
  trendingBooksContainer: {
    marginTop: 15,
  },
  bookContainer: {
    width: 110,
    alignItems: 'center',
  },
  containerTitle: {
    color: colors.TEXT_COLOR,
    marginBottom: 10,
    fontSize: RFValue(20),
  },
  bookInfo: {
    textAlign: 'center',
    width: '90%',
    marginHorizontal: 5,
    fontSize: RFValue(10),
  },
});
