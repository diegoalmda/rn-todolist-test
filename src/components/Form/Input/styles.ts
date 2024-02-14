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

  background-color: ${({ theme }) => theme.colors.background_details};
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
/*
  border-bottom-width: 2px;
  border-top-width: 2px;
  border-bottom-color: transparent;
  border-top-color: transparent;


  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.shape};
  `}; */
`;

export const InputText = styled.TextInput.attrs({
  placeholderTextColor: `${theme.colors.text_placeholder}`,
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_details};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding-right: 23px;

  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;

  /* border-bottom-width: 2px;
  border-top-width: 2px;
  border-bottom-color: transparent;
  border-top-color: transparent;


  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.shape};
  `}; */
`;
