import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View, Modal } from 'react-native';

import CustomText from './CustomText';
import SecondaryButton from './SecondaryButton';
import { colors } from '../../../assets/color-scheme/COLOR_PALLET';

interface Props extends React.ComponentProps<typeof View> {
  title: string;
}

const CustomModal = forwardRef((props: Props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setModalVisible(true),
  }));

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomText style={styles.modalTextTitle} text={props.title} />
          {props.children}
          <SecondaryButton
            style={styles.closeButton}
            text="Sluit"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: colors.THEME_WHITE,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextTitle: {
    color: 'black',
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
  },
});

export default CustomModal;
