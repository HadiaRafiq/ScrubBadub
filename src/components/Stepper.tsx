import React from 'react';
import { View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Text, makeStyles, useTheme } from '@rneui/themed';

export interface Step {
  label?: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  activeColor,
  inactiveColor,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
    const textColor = (theme.colors as any).text || '#252525';

  const activeStepColor = activeColor || theme.colors.secondary || '#4DD0E1';
  const inactiveStepBg = inactiveColor || '#E0E0E0';
  const inactiveStepText = '#757575';
  const connectorColor = '#E0E0E0';

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <View style={styles.stepContainer}>
              {/* Step Circle */}
              <View
                style={[
                  styles.stepCircle,
                  {
                    backgroundColor: isActive
                      ? activeStepColor
                      : isCompleted
                        ? activeStepColor
                        : inactiveStepBg,
                  },
                ]}>
                <Text
                  style={[
                    styles.stepNumber,
                    {
                      color: isActive || isCompleted ? '#FFFFFF' : inactiveStepText,
                    },
                  ]}>
                  {index + 1}
                </Text>
              </View>

              {/* Step Label */}
              {step.label && (
                <Text
                  style={[
                    styles.stepLabel,
                    {
                        color: isActive ? textColor : inactiveStepText,
                      fontWeight: isActive ? '600' : '400',
                    },
                  ]}
                  numberOfLines={2}>
                  {step.label}
                </Text>
              )}
            </View>

            {/* Connector Line */}
            {!isLast && (
              <View
                style={[
                  styles.connector,
                  {
                    backgroundColor: connectorColor,
                  },
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(16),
    width: '100%',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: moderateScale(60),
  },
  stepCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  stepNumber: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    fontFamily: 'Montserrat_700Bold',
  },
  stepLabel: {
    fontSize: moderateScale(12),
    textAlign: 'center',
    lineHeight: moderateScale(16),
    paddingHorizontal: moderateScale(4),
    minHeight: verticalScale(32),
  },
  connector: {
    flex: 1,
    height: 2,
    marginTop: verticalScale(17),
    marginHorizontal: moderateScale(4),
    maxWidth: moderateScale(40),
  },
}));

export default Stepper;

