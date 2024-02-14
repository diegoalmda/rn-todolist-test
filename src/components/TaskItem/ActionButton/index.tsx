// React/React Native and expo imports
import React from 'react';
import { Feather } from '@expo/vector-icons';

// External libs imports
import { useTheme } from 'styled-components';

// Styles imports
import { Container } from './styles';
import { type TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {}

export function ActionButton({ onPress, ...rest }: Props): React.JSX.Element {
  const theme = useTheme();

  return (
    <Container onPress={onPress} {...rest}>
      <Feather name={'trash'} size={24} color={theme.colors.background_details} />
    </Container>
  );
}
