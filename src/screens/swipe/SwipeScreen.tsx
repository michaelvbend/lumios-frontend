import { useRef } from 'react';
import { StyleSheet } from 'react-native';

import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

import Header from '../../components/shared/Header';
import SecondaryButton from '../../components/shared/SecondaryButton';
import SwipeBook from '../../components/book/SwipeBook';
import CustomModal from '../../components/shared/CustomModal';
import CustomText from '../../components/shared/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';

interface CustomModalRef {
  openModal: () => void;
}

export default function SwipeScreen() {
  const modalRef = useRef<CustomModalRef>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };

  return (
    <>
      <Header headerHeight={350}>
        <CustomText text='Iets voor jou?' style={styles.title} />
      </Header>
      <SwipeBook />
      <SecondaryButton
        iconName='information-circle-outline'
        iconSize={20}
        text='Hoe werkt het?'
        style={styles.helpButton}
        textStyle={styles.helpButtonText}
        onPress={openModal}
      />

      <CustomModal title='Instructie' ref={modalRef}>
        <CustomText
          text={`U kunt een boek naar links of rechts swipen. Swipen naar rechts betekent dat u het boek leuk vindt. Swipen naar links betekent dat u het boek niet leuk vindt.
          \nDe gelikede boeken kunt u terug vinden bij uw matches.
          \nHet swipen is belangrijk om u gepersonaliseerde aanbevelingen te kunnen doen.`}
          style={styles.modalText}
          numberOfLines={99}
        />
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(35),
    textAlign: 'center',
    marginTop: 30,
    color: 'white',
  },
  helpButton: {
    backgroundColor: colors.INPUT_GREY,
    gap: 10,
  },
  helpButtonText: {
    color: colors.TEXT_COLOR,
  },
  modalText: {
    color: colors.TEXT_COLOR,
  },
});
