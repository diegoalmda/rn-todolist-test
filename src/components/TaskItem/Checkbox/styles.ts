import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const CheckboxContainer = styled.View`
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;
  border-radius: 8px;
  border-width: 1px;

  border-color: ${({ theme }) => theme.colors.main};
`;

export const CheckMark = styled(Animated.View)`
  height: 14px;
  width: 14px;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 7px;
  align-items: center;
  justify-content: center;
`;

export const UncheckedBox = styled.View`
  height: 14px;
  width: 14px;
  background-color: ${({ theme }) => theme.colors.background_details};
  border-radius: 7px;
`;