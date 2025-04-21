import React from 'react';
import {ViewStyle} from 'react-native';
import {StyleProp} from 'react-native';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface TicDriveModalProps {
  title: string;
  content: string;
  visible?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmButtonStyle?: StyleProp<ViewStyle>;
}

const TicDriveModal: React.FC<TicDriveModalProps> = ({
  title,
  content,
  visible = false,
  onClose,
  onConfirm,
  confirmText = '',
  cancelText = '',
  confirmButtonStyle,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{content}</Text>

          <View style={styles.actions}>
            {cancelText && (
              <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>
            )}

            {confirmText && (
              <TouchableOpacity
                onPress={onConfirm || onClose}
                style={[styles.confirmButton, confirmButtonStyle]}
                className="bg-drive"
              >
                <Text style={styles.confirmText}>{confirmText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 6},
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1B1B1B',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#3A3A3A',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  cancelText: {
    color: '#333',
    fontSize: 15,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  confirmText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default TicDriveModal;
