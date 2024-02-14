import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../../styles/theme';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  background-color: ${({ theme }) => theme.colors.background_details};

  ${({ isFocused, theme }) => !isFocused && css`
    background-color: ${theme.colors.background_input};
  `}; 
`;

export const IconContainerRight = styled(IconContainer)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;  
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: `${theme.colors.text_placeholder}`,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_details};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  ${({ isFocused, theme }) => !isFocused && css`
    background-color: ${theme.colors.background_input};
  `}; 
`;