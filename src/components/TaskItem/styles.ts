import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../styles/theme';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;  
  height: 52px;  
`;

export const InputCheckContainer = styled.Pressable`
  flex: 1;
  flex-direction: row;
  align-items: center; 
  height: 46px;
`;

export const TaskGestureHandlerContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 46px;
  padding-left: 10px;

  background-color: ${({ theme }) => theme.colors.background_details};

  border-radius: 6px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.line};
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: `${theme.colors.text_placeholder}`,
})`
  flex: 1;
  height: 32px;
  margin-left: 6px;
  margin-right: 12px;

  background-color: ${({ theme }) => theme.colors.background_details};
  color: ${({ theme, checked }) => checked ? theme.colors.text_light: theme.colors.main};

  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(14)}px;
`;
