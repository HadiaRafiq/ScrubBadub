import React, { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from '@rneui/themed';

type DatePickerProps = {
  isVisible: boolean;
  value?: Date;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  display?: 'default' | 'spinner' | 'calendar' | 'clock' | 'compact';
  onConfirm: (date: Date) => void;
  onCancel: () => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
  isVisible,
  value = new Date(),
  minimumDate,
  maximumDate,
  mode = 'date',
  display = Platform.OS === 'ios' ? 'spinner' : 'default',
  onConfirm,
  onCancel,
}) => {
  const [selectedDate, setSelectedDate] = useState(value);

  useEffect(() => {
    if (isVisible && value) {
      setSelectedDate(value);
    }
  }, [isVisible, value]);

  const handleChange = (
    event: { type: string; nativeEvent: object },
    date?: Date,
  ) => {
    if (Platform.OS === 'android') {
      // Android handles its own modal
      if (event.type === 'set' && date) {
        onConfirm(date);
      } else {
        onCancel();
      }
    } else {
      // iOS: update selected date in state
      if (date) {
        setSelectedDate(date);
      }
    }
  };

  const handleIOSConfirm = () => {
    onConfirm(selectedDate);
  };

  if (Platform.OS === 'android') {
    // Android: Native picker handles its own modal
    if (!isVisible) {
      return null;
    }

    return (
      <DateTimePicker
        value={selectedDate}
        mode={mode}
        display={display}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onChange={handleChange}
      />
    );
  }

  // iOS: Show modal with picker and buttons
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Date</Text>
            <TouchableOpacity
              onPress={handleIOSConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={selectedDate}
            mode={mode}
            display={display}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onChange={handleChange}
            style={styles.picker}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingBottom: verticalScale(20),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: '#111827',
  },
  cancelButton: {
    padding: moderateScale(8),
  },
  cancelButtonText: {
    fontSize: moderateScale(16),
    color: '#6B7280',
  },
  confirmButton: {
    padding: moderateScale(8),
  },
  confirmButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#10B981',
  },
  picker: {
    width: '100%',
    height: moderateScale(200),
  },
});

export default DatePicker;
