import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import * as React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface ErroModalProps {
  title?: string;
}

const ErrorModal: React.FC<ErroModalProps> = ({title = 'Try Again'}) => {
  const globalContext = React.useContext(GlobalContext);

  if (!globalContext) {
    console.error(
      'Error: GlobalContext is not available. Make sure the provider is wrapping the app.',
    );
    return null;
  }

  const {errorMessage, setErrorMessage} = globalContext;

  const onDismiss = () => {
    setErrorMessage('');
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={!!errorMessage}
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
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
    ...StyleSheet.absoluteFillObject,
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
    elevation: 10, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    backgroundColor: 'red',
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
