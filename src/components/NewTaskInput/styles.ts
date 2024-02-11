import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import theme from '../../styles/theme';

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
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;

  
  border-width: 2px;
  border-left-width: 0;
  border-color: ${({ theme }) => theme.colors.main};

  background-color: ${({ theme }) => theme.colors.background_details};

  /* ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.shape};
  `}; */
`;

export const AddButton = styled.TouchableOpacity<Props>`
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: `${theme.colors.text_placeholder}`,
})`
  flex: 1;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.background_details};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  border-width: 2px;
  border-right-width: 0;
  border-color: ${({ theme }) => theme.colors.main};

  padding-left: 23px;

  /* ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.shape};
  `}; */
`;
