import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps {
    color?: string;
}

interface ButtonTextProps {
  removeType: boolean;
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  width: 100%;

  padding: 17px;
  align-items: center;
  justify-content: center;

  background-color: transparent;
  border-width: ${({ color, theme }) => color === theme.colors.warning_light ? '0' : `${RFValue(1)}px`};
  
  border-color: ${({ color }) => color};
  background-color: ${({ color, theme }) => color === theme.colors.shape_dark ? theme.colors.shape_dark : "transparent"};
  border-radius: 6px;
  margin-bottom: 12px;
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_700};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, removeType }) => removeType ? theme.colors.warning_light : theme.colors.background_details};
`;