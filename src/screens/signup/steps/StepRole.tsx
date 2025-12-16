import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, Theme } from '@rneui/themed';

import { ROLES } from '@/types/user';

import { SignUpStyles } from '../types';

type Props = {
  styles: SignUpStyles;
  theme?: Theme; // Not used but kept for compatibility with parent component
  roleValue?: ROLES;
  onSelectRole: (role: ROLES) => void;
};

const roleCards = [
  {
    role: ROLES.BUD,
    title: 'Bud (Customer)',
    description: 'Get your laundry done by professional service providers',
    icon: 'people-outline',
    defaultBackground: '#E1FFFA',
    selectedBackground: '#0FAF9C',
    defaultTextColor: '#0FAF9C',
    selectedTextColor: '#0FAF9C',
    defaultIconColor: '#0FAF9C',
    selectedIconColor: '#0FAF9C',
  },
  {
    role: ROLES.SCRUB,
    title: 'Scrub (Service Provider)',
    description: 'Offer laundry services and earn money on your schedule',
    icon: 'star-outline',
    defaultBackground: '#E7FFED',
    selectedBackground: '#1C9B64',
    defaultTextColor: '#1C9B64',
    selectedTextColor: '#1C9B64',
    defaultIconColor: '#1C9B64',
    selectedIconColor: '#1C9B64',
  },
  {
    role: ROLES.DUBER,
    title: 'Duber (Driver)',
    description: 'Deliver laundry and earn money with flexible hours',
    icon: 'car-outline',
    defaultBackground: '#F3E8FF',
    selectedBackground: '#8C3CD5',
    defaultTextColor: '#8C3CD5',
    selectedTextColor: '#8C3CD5',
    defaultIconColor: '#8C3CD5',
    selectedIconColor: '#8C3CD5',
  },
];

const StepRole: React.FC<Props> = ({ styles, roleValue, onSelectRole }) => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>What describes you best?</Text>
      <View style={styles.roleGrid}>
        {roleCards.map(card => {
          const isSelected = roleValue === card.role;
          const backgroundColor = isSelected
            ? card.selectedBackground
            : card.defaultBackground;
          const titleColor = isSelected
            ? card.selectedTextColor
            : card.defaultTextColor;
          const iconColor = isSelected
            ? card.selectedIconColor
            : card.defaultIconColor;
          const descriptionColor = isSelected ? '#FFFFFF' : '#6B7280'; // White when selected, grey when not

          return (
            <TouchableOpacity
              key={card.role}
              style={[
                styles.roleCard,
                { backgroundColor },
                isSelected && styles.roleCardSelected,
              ]}
              onPress={() => onSelectRole(card.role)}
            >
              <View style={styles.roleCardIcon}>
                <Ionicons name={card.icon} size={24} color={iconColor} />
              </View>
              <View style={styles.roleCardTextContainer}>
                <Text style={[styles.roleCardTitle, { color: titleColor }]}>
                  {card.title}
                </Text>
                <Text
                  style={[
                    styles.roleCardDescription,
                    { color: descriptionColor },
                  ]}
                >
                  {card.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StepRole;
