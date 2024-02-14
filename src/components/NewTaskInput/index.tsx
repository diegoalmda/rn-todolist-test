// React/React Native and expo imports
import React, { useRef, useState } from 'react';
import { Alert, Keyboard, type TextInput } from 'react-native';

// External libs imports
import { useTheme } from 'styled-components';

// Icons imports
import { Feather } from '@expo/vector-icons';

// Local imports
import { useTaskContext } from '../../contexts/taskContext';

// Styles imports
import { AddButton, Container, IconContainer, InputText } from './styles';

export function NewTaskInput(): React.JSX.Element {
  const [taskTitle, setTaskTitle] = useState('');
  const newTaskInputRef = useRef<TextInput>(null);

  const { addNewTask } = useTaskContext();

  const theme = useTheme();

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

  return (
    <Container>
      <InputText
        ref={newTaskInputRef}
        placeholder="Adicione uma tarefa"
        keyboardType="default"
        autoCorrect={false}
        autoCapitalize="sentences"
        value={taskTitle}
        maxLength={50}
        onChangeText={setTaskTitle}
        onSubmitEditing={() => {
          addTask(taskTitle);
        }}
      />

      <IconContainer>
        <AddButton
          activeOpacity={0.5}
          onPress={() => {
            addTask(taskTitle);
          }}
        >
          <Feather name="plus" size={28} color={theme.colors.main} />
        </AddButton>
      </IconContainer>
    </Container>
  );
}
