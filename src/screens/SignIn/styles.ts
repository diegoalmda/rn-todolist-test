import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  padding: 0 24px;
  height: 100%;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main};
`;

export const MainContent = styled.View`
  margin-top: auto;
`;

export const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const LogoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const Title = styled.Text`
  font-size: ${RFValue(26)}px;
  font-family: ${({ theme }) => theme.fonts.primary_700};
  color: ${({ theme }) => theme.colors.title};
  margin-left: 5px;
`;

export const SubTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.shape};
  line-height: ${RFValue(25)}px;
  margin-top: 4px;
`;

export const Form = styled.View`
  width: 100%;
  margin-top: 64px;
  gap: 4px;
`;

export const ErrorMessageContainer = styled.View`
  width: 100%;
  align-items: center;
  height: ${RFValue(20)}px;
`;

export const ErrorMessage = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.warning_light};
`;

export const FormButtonContainer = styled.View``;

export const DeleteAccountButtonContainer = styled.View`
  margin-top: auto;
  margin-bottom: ${getBottomSpace() + 60}px;
`;
