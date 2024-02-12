import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../styles/theme';

export const Container = styled.View`
  flex-direction: row;
  gap: 12px;
  height: 52px;
  
  align-items: center;

  margin-bottom: 8px;
  margin-top: 8px;
`;

export const InputCheckContainer = styled.Pressable`
  flex: 1;
  height: 46px;
  flex-direction: row;
  align-items: center;  
`;

export const TaskGestureHandlerContainer = styled.View`
  flex: 1;
  height: 46px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_details};
  border-radius: 6px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.line};

  padding-left: 10px;
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: `${theme.colors.text_placeholder}`,
})`
  flex: 1;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.background_details};
  color: ${({ theme, checked }) => checked ? theme.colors.text_light: theme.colors.main};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(14)}px;

  border-bottom-width: 1px;
  border-bottom-color: transparent;

  padding-right: 20px;
  margin-left: 6px;

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.shape};
  `}; 
`;
