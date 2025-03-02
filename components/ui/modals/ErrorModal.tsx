import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import * as React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ErrorModal = () => {
  const {errorMessage, setErrorMessage} = React.useContext(GlobalContext);

  const onDismiss = () => {
    setErrorMessage('');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!errorMessage}
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Try again</Text>
          <Text style={styles.modalMessage}>{errorMessage}</Text>
          <TouchableOpacity onPress={onDismiss} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ErrorModal;
