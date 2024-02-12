// React/React Native and expo imports
import React, { useState } from 'react';
import { type TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

// External libs imports
import { useTheme } from 'styled-components';

// Styles imports
import { AddButton, Container, IconContainer, InputText } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function NewTaskInput({ iconName, value, ...rest }: Props): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus(): void {
    setIsFocused(true);
  }

  function handleInputBlur(): void {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />

      <IconContainer isFocused={isFocused}>
        <AddButton activeOpacity={0.5}>
          <Feather name={iconName} size={24} color={theme.colors.main} />
        </AddButton>
      </IconContainer>
    </Container>
  );
}
