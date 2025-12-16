import React from 'react';
import { View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { makeStyles, Text, useTheme } from '@rneui/themed';

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

  // Teal color for active/completed steps (matching the image)
  const activeStepColor = activeColor || '#38DDCF';
  // Light gray for inactive steps
  const inactiveStepBg = inactiveColor || '#E0E0E0';
  // Dark gray text for inactive steps
  const inactiveStepText = '#757575';
  const activeConnectorColor = activeStepColor;
  const inactiveConnectorColor = '#E0E0E0';

  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isLast = index === steps.length - 1;
        const isStepActive = isActive || isCompleted;

        // Connector line after this step is active if this step is completed
        // The connector between steps is teal if the step before it is completed
        const isConnectorActive = index < currentStep;

        // White text on teal circles, dark gray text on gray circles
        const stepNumberColor = isStepActive ? '#FFFFFF' : inactiveStepText;
        const labelColor = isStepActive ? theme.colors.grey2 : inactiveStepText;
        const labelWeight = isStepActive ? '600' : '400';

        return (
          <React.Fragment key={index}>
            <View style={styles.stepWrapper}>
              <View style={styles.stepContainer}>
                {/* Step Circle */}
                <View
                  style={[
                    styles.stepCircle,
                    {
                      backgroundColor: isStepActive
                        ? activeStepColor
                        : inactiveStepBg,
                    },
                  ]}
                >
                  <Text style={[styles.stepNumber, { color: stepNumberColor }]}>
                    {index + 1}
                  </Text>
                </View>

                {/* Step Label - Optional */}
                {step.label && (
                  <Text
                    style={[
                      styles.stepLabel,
                      {
                        color: labelColor,
                        fontWeight: labelWeight,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {step.label}
                  </Text>
                )}
              </View>

              {/* Connector Line - Attached to center of circle */}
              {!isLast && (
                <View
                  style={[
                    styles.connector,
                    {
                      backgroundColor: isConnectorActive
                        ? activeConnectorColor
                        : inactiveConnectorColor,
                    },
                  ]}
                />
              )}
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(16),
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  stepContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 2,
  },
  stepCircle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  stepLabel: {
    fontSize: moderateScale(12),
    textAlign: 'center',
    paddingHorizontal: moderateScale(4),
    marginTop: verticalScale(4),
  },
  connector: {
    position: 'absolute',
    left: moderateScale(30), // Start from center of current circle
    right: moderateScale(-30), // Extend 18px beyond right edge to reach next circle center
    top: moderateScale(16), // Center vertically: (36/2) - (4/2) = 18 - 2 = 16
    height: 4,
    zIndex: 1,
  },
}));

export default Stepper;
