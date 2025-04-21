import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface LogoutModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({
  visible,
  onConfirm,
  onCancel,
}: LogoutModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 w-[85%] shadow-lg">
          <Text className="text-lg font-semibold text-center mb-6">
            Are you sure you want to logout?
          </Text>

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 bg-gray-200 py-3 rounded-full mr-2"
            >
              <Text className="text-center text-base font-medium text-gray-700">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-red-500 py-3 rounded-full ml-2"
            >
              <Text className="text-center text-base font-medium text-white">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
