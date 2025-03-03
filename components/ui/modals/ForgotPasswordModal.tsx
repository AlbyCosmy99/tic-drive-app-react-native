import {Controller, useForm} from 'react-hook-form';
import {Modal, StyleSheet, Text, View} from 'react-native';
import TicDriveInput from '../inputs/TicDriveInput';
import CrossPlatformButtonLayout from '../buttons/CrossPlatformButtonLayout';
import axiosClient from '@/services/http/axiosClient';
import {useEffect, useState} from 'react';

interface ForgotPasswordModalProps {
  visible: boolean;
  onDismiss: () => void;
}

interface FormValues {
  email: string;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onDismiss,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {email: ''},
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      reset();
    }
  }, [visible, reset]);

  const onSendEmail = (data: FormValues) => {
    setLoading(true);
    axiosClient
      .post('/auth/forgot-password', {email: data.email})
      .then(response => {
        setLoading(false);
        setSuccessMessage('A verification email has been sent to your inbox.');
        setTimeout(() => {
          onDismiss();
        }, 1000);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={[styles.modalTitle, {marginBottom: 12}]}>
            Insert email to change password
          </Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Please enter a valid email address',
              },
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <>
                <TicDriveInput
                  placeholder="Email"
                  isRightIcon={true}
                  customValue={value}
                  onChange={onChange}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={{height: 60}}
                  returnKeyType="send"
                />
                <Text style={styles.errorText}>{error?.message}</Text>
              </>
            )}
          />
          <View style={[styles.buttonRow, {marginTop: 6}]}>
            <CrossPlatformButtonLayout
              removeAllStyles
              onPress={handleSubmit(onSendEmail)}
              containerTailwindCss="flex-1 bg-drive p-2 px-4 rounded-lg"
              disabled={loading}
            >
              <Text className="font-medium text-base text-white text-center">
                Send verification email
              </Text>
            </CrossPlatformButtonLayout>
            <CrossPlatformButtonLayout
              removeAllStyles
              onPress={onDismiss}
              containerTailwindCss="bg-red-500 ml-4 p-2 px-4 rounded-lg"
              disabled={loading}
            >
              <Text className="font-medium text-base text-white text-center">
                Close
              </Text>
            </CrossPlatformButtonLayout>
          </View>
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
    width: 350,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  inputContainerStyle: {
    marginTop: 0,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default ForgotPasswordModal;
