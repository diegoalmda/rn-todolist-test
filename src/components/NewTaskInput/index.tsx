// React/React Native and expo imports
import React, { useRef, useState } from 'react';
import { Alert, Keyboard, type TextInput, type TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

// External libs imports
import { useTheme } from 'styled-components';

// Styles imports
import { AddButton, Container, IconContainer, InputText } from './styles';
import { useTaskContext } from '../../contexts/taskContext';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function NewTaskInput({ ...rest }: Props): React.JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [, setIsFilled] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const newTaskInputRef = useRef<TextInput>(null);

  const { addNewTask } = useTaskContext();

  const theme = useTheme();

  function handleInputFocus(): void {
    setIsFocused(true);
  }

  function addTask(title: string): void {
    // Alert.alert(title);
    addNewTask(title);
    newTaskInputRef.current?.blur();
    Keyboard.dismiss();
    setTaskTitle('');
  }

  function handleInputBlur(): void {
    setIsFocused(false);
    setIsFilled(!!taskTitle);
  }

  return (
    <Container>
      <InputText
        ref={newTaskInputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        value={taskTitle}
        onChangeText={setTaskTitle}
        {...rest}
      />

      <IconContainer isFocused={isFocused}>
        <AddButton
          activeOpacity={0.5}
          onPress={() => {
            addTask(taskTitle);
          }}
        >
          <Feather name="plus" size={24} color={theme.colors.main} />
        </AddButton>
      </IconContainer>
    </Container>
  );
}
