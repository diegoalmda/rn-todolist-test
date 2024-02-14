// React/React Native and expo imports
import React, { useState } from 'react';
import { type TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

// External libs imports
import { useTheme } from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// Styles imports
import { Container, IconContainer, IconContainerRight, InputText } from './styles';

interface Props extends TextInputProps {
  value?: string;
}

export function PasswordInput({ value, ...rest }: Props): React.JSX.Element {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus(): void {
    setIsFocused(true);
  }

  function handleInputBlur(): void {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange(): void {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={'lock'}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_light}
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
        {...rest}
      />

      <TouchableWithoutFeedback onPress={handlePasswordVisibilityChange}>
        <IconContainerRight isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text}
          />
        </IconContainerRight>
      </TouchableWithoutFeedback>
    </Container>
  );
}
