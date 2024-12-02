import { Pressable, StyleSheet, View } from 'react-native';
import CustomText from '../shared/CustomText';
import { CommentComponent } from '../../types/BookActions';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';
import { RFValue } from 'react-native-responsive-fontsize';
import SecondaryButton from '../shared/SecondaryButton';

export default function Comment({ commentProps }: { commentProps: CommentComponent }) {
  const { username, date, comment, likes, dislikes } = commentProps;

  const newDate = '3 maanden geleden';
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentSection}>
        <View>
          <View style={styles.commentInfo}>
            <CustomText text={username} style={styles.usernameText} />
            <CustomText text={newDate} style={styles.dateAgoText} />
          </View>
          <CustomText text={comment} style={styles.commentText} />
        </View>
        <View style={styles.commentActionContainer}>
          <SecondaryButton
            iconName="thumbs-down"
            iconColor={colors.ERROR_COLOR}
            iconSize={16}
            text={likes.toString()}
            textStyle={styles.amountOfLikes}
            style={styles.likeAction}
          />
          <SecondaryButton
            iconName="thumbs-up"
            iconColor={colors.PRIMARY_COLOR_GREEN_DARK}
            iconSize={16}
            text={likes.toString()}
            textStyle={styles.amountOfLikes}
            style={styles.likeAction}
          />
        </View>
      </View>
      <SecondaryButton
        iconName="arrow-down"
        iconColor={colors.TEXT_COLOR}
        iconSize={RFValue(12)}
        text="Uitklappen"
        textStyle={styles.showMoreText}
        style={styles.showMoreButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: colors.INPUT_GREY,
    borderRadius: 15,
    marginBottom: 50,
    marginVertical: 5,
  },
  commentSection: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentInfo: {
    margin: 5,
  },
  usernameText: {
    color: colors.TEXT_COLOR,
    fontSize: RFValue(12),
  },
  dateAgoText: {
    color: colors.THEME_GREY,
    fontSize: RFValue(10),
  },
  commentText: {
    color: colors.TEXT_COLOR,
    fontFamily: 'CircularBook',
    margin: 5,
  },
  showMoreText: {
    color: colors.TEXT_COLOR,
    fontSize: RFValue(10),
  },
  commentActionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  likeAction: {
    marginHorizontal: -4,
    backgroundColor: colors.INPUT_GREY,
  },
  likeActionText: {
    padding: 5,
    textAlign: 'center',
  },
  amountOfLikes: {
    fontFamily: 'CircularItalic',
    color: colors.TEXT_COLOR,
    marginLeft: 5,
  },
  showMoreButton: {
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    backgroundColor: 'lightgrey',
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
