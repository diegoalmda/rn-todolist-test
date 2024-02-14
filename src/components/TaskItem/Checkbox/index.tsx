// React import
import React from 'react';

// External icons imports
import { Feather } from '@expo/vector-icons';

// Animation imports
import { ZoomIn, ZoomOut } from 'react-native-reanimated';

// Styles imports
import theme from '../../../styles/theme';
import { CheckboxContainer, CheckMark, UncheckedBox } from './styles';
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
