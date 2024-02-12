// React/React Native and expo imports
import React, { type ReactNode } from 'react';
import { type TouchableOpacityProps } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

// External libs imports
import { useTheme } from 'styled-components';

// Styles imports
import { Container } from './styles';

interface Props extends TouchableOpacityProps {
  iconName: 'confirm' | 'delete' | 'edit' | 'cancel';
}

export function ActionButton({ iconName, onPress, ...rest }: Props): React.JSX.Element {
  const theme = useTheme();

  const setButtonColor = (name: string): string | undefined => {
    switch (name) {
      case 'edit':
        return theme.colors.main;
      case 'confirm':
        return theme.colors.shape;
      case 'cancel':
        return theme.colors.warning_light;
      default:
        return theme.colors.warning_dark;
    }
  };

  const renderButtonIcon = (name: string): ReactNode => {
    switch (name) {
      case 'edit':
        return <Feather name={'edit-3'} size={24} color={theme.colors.background_details} />;
      case 'confirm':
        return <Feather name={'check'} size={24} color={theme.colors.background_details} />;
      case 'delete':
        return <Feather name={'trash'} size={24} color={theme.colors.background_details} />;
      case 'cancel':
        return <AntDesign name={'close'} size={24} color={theme.colors.background_details} />;
      default:
        return null;
    }
  };

  return (
    <Container buttonColor={setButtonColor(iconName)} onPress={onPress} {...rest}>
      {renderButtonIcon(iconName)}
    </Container>
  );
}
