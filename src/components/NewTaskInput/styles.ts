import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View`
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
`;

export const AddButton = styled.TouchableOpacity`
  height: 36px;
  width: 36px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-radius: 6px;
  border-color: ${({ theme }) => theme.colors.main};
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
`;
