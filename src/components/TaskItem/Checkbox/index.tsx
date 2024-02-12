import { Feather } from '@expo/vector-icons';
import { ZoomIn, ZoomOut } from 'react-native-reanimated';
import theme from '../../../styles/theme';
import { CheckboxContainer, CheckMark, UncheckedBox } from './styles';
import React from 'react';

interface Props {
  checked: boolean;
}

export function Checkbox({ checked = false, ...rest }: Props): React.JSX.Element {
  return (
    <CheckboxContainer>
      {checked ? (
        <CheckMark entering={ZoomIn} exiting={ZoomOut}>
          <Feather name="check" size={10} color={theme.colors.background_details} />
        </CheckMark>
      ) : (
        <UncheckedBox />
      )}
    </CheckboxContainer>
  );
}
