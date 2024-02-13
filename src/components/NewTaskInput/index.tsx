// React/React Native and expo imports
import React, { useRef, useState } from 'react';
import { Alert, Keyboard, type TextInput, type TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

// External libs imports
import { useTheme } from 'styled-components';

// Styles imports
import { AddButton, Container, IconContainer, InputText } from './styles';
import { useTaskContext } from '../../contexts/taskContext';

export function NewTaskInput(): React.JSX.Element {
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
    if (title.trim().length > 0) {
      addNewTask(title);
      newTaskInputRef.current?.blur();
      Keyboard.dismiss();
      setTaskTitle('');
    } else {
      Alert.alert('Título inválido!', 'O título da tarefa precisa conter entre 1 e 50 caracteres.');
    }
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
        placeholder="Adicione uma tarefa"
        keyboardType="default"
        autoCorrect={false}
        autoCapitalize="sentences"
        isFocused={isFocused}
        value={taskTitle}
        maxLength={50}
        onChangeText={setTaskTitle}
        onSubmitEditing={() => {
          addTask(taskTitle);
        }}
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
