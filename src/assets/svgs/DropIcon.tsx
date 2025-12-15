import * as React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect, SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

type DropIconProps = SvgProps & {
  strokeColor?: string;
  fillColor?: string;
};

const DropIcon = ({ strokeColor, fillColor, ...props }: DropIconProps) => {
  const {
    theme: { colors },
  } = useTheme();

  const stroke = strokeColor;
  const fill = fillColor;

  return (
    <Svg
      width={21}
      height={28}
      viewBox="0 0 21 28"
      fill="none"
    >
      <Path d="M21 28H0V0H21V28Z" stroke={stroke} />
      <G clipPath="url(#clip0_3206_10324)">
        <G clipPath="url(#clip1_3206_10324)">
          <Path
            d="M10.2228 27.6691C4.57897 27.6691 0 23.0901 0 17.4462C0 12.5904 6.93235 3.48038 8.87043 1.03116C9.18989 0.631827 9.66377 0.408203 10.1749 0.408203H10.2707C10.7819 0.408203 11.2558 0.631827 11.5752 1.03116C13.5133 3.48038 20.4457 12.5904 20.4457 17.4462C20.4457 23.0901 15.8667 27.6691 10.2228 27.6691ZM5.11141 18.2981C5.11141 17.8296 4.72806 17.4462 4.25951 17.4462C3.79096 17.4462 3.40761 17.8296 3.40761 18.2981C3.40761 21.5939 6.07513 24.2615 9.37092 24.2615C9.83947 24.2615 10.2228 23.8781 10.2228 23.4096C10.2228 22.941 9.83947 22.5577 9.37092 22.5577C7.01754 22.5577 5.11141 20.6515 5.11141 18.2981Z"
            fill={fill}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_3206_10324">
          <Rect
            width={20.4457}
            height={27.2609}
            fill="white"
            transform="translate(0 0.408203)"
          />
        </ClipPath>
        <ClipPath id="clip1_3206_10324">
          <Path d="M0 0.408203H20.4457V27.6691H0V0.408203Z" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default DropIcon;
