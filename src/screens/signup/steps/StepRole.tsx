import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '@rneui/themed';

import { ROLES } from '@/types/user';
import { SignUpStyles } from '../types';

type Props = {
  styles: SignUpStyles;
  theme: any;
  roleValue?: ROLES;
  onSelectRole: (role: ROLES) => void;
};

const roleCards = (theme: any) => [
  {
    role: ROLES.BUD,
    title: 'Bud (Customer)',
    description: 'Get your laundry done by professional service providers',
    icon: 'people-outline',
    containerStyle: { backgroundColor: '#E1FFFA' },
    textColor: '#0FAF9C',
    iconColor: theme.colors.primary,
  },
  {
    role: ROLES.SCRUB,
    title: 'Scrub (Service Provider)',
    description: 'Offer laundry services and earn money on your schedule',
    icon: 'briefcase-outline',
    containerStyle: { backgroundColor: '#E7FFED' },
    textColor: '#1C9B64',
    iconColor: '#1C9B64',
  },
  {
    role: ROLES.DUBER,
    title: 'Duber (Driver)',
    description: 'Deliver laundry and earn money with flexible hours',
    icon: 'car-outline',
    containerStyle: { backgroundColor: '#F3E8FF' },
    textColor: '#8C3CD5',
    iconColor: '#8C3CD5',
  },
];

const StepRole: React.FC<Props> = ({ styles, theme, roleValue, onSelectRole }) => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>What describes you best?</Text>
      <View style={styles.roleGrid}>
        {roleCards(theme).map(card => {
          const isSelected = roleValue === card.role;
          return (
            <TouchableOpacity
              key={card.role}
              style={[
                styles.roleCard,
                card.containerStyle,
                isSelected && [styles.roleCardSelected, { borderColor: theme.colors.primary }],
              ]}
              onPress={() => onSelectRole(card.role)}>
              <View style={styles.roleCardIcon}>
                <Ionicons name={card.icon} size={24} color={card.iconColor} />
              </View>
              <Text style={[styles.roleCardTitle, { color: card.textColor }]}>
                {card.title}
              </Text>
              <Text style={styles.roleCardDescription}>{card.description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StepRole;

