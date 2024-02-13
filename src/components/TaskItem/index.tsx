// React/React Native and expo imports
import React, { useState, useRef } from 'react';
import { Alert, Keyboard, type TextInput } from 'react-native';

// Components imports
import { ActionButton } from './ActionButton';
import { Checkbox } from './Checkbox';

// Styles imports
import { InputCheckContainer, Container, InputText, TaskGestureHandlerContainer } from './styles';
import { type Task } from '../../contexts/taskContext/taskType';
import { useTaskContext } from '../../contexts/taskContext';

export function TaskItem(task: Task): React.JSX.Element {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const { editTaskTitle, removeTaskById, toggleTaskDone } = useTaskContext();

  const taskInput = useRef<TextInput>(null);

  function handleInputFocus(): void {
    setIsFocused(true);
  }

  function handleInputBlur(): void {
    setIsFocused(false);
  }

  function handleChangeTaskStatus(id: Task['id']): void {
    toggleTaskDone(id);
  }

  function handleTaskTitleChange(title: string): void {
    setTaskTitle(title);
  }

  function removeTask(id: Task['id']): void {
    removeTaskById(id);
  }

  function handleStartEditingTask(): void {
    taskInput.current?.focus();
    handleInputFocus();
    setSelection({ start: taskTitle.length, end: taskTitle.length });
  }

  function handleEndEditingTask(): void {
    taskInput.current?.blur();
    handleInputBlur();
    Keyboard.dismiss();

    if (taskTitle.trim().length > 0) {
      const newTask = {
        ...task,
        title: taskTitle,
      };
      editTaskTitle(newTask);
    } else {
      setTaskTitle(task.title);
      Alert.alert('Título inválido!', 'O título da tarefa precisa conter entre 1 e 50 caracteres.');
    }
  }

  function handleCancelEditingTask(): void {
    taskInput.current?.blur();
    handleInputBlur();
    Keyboard.dismiss();
    setTaskTitle(task.title);
  }

  return (
    <Container>
      <InputCheckContainer
        onPress={() => {
          handleChangeTaskStatus(task.id);
        }}
      >
        <TaskGestureHandlerContainer pointerEvents={isFocused ? 'auto' : 'none'}>
          {!isFocused && <Checkbox checked={task.done} />}
          <InputText
            ref={taskInput}
            multiline={false}
            numberOfLine={1}
            horizontal={true}
            scrollEnabled={false}
            maxLength={50}
            onChangeText={handleTaskTitleChange}
            value={taskTitle}
            selection={selection}
            onSelectionChange={({ nativeEvent: { selection } }) => {
              setSelection(selection);
            }}
            textDecorationLine={task.done && !isFocused ? 'line-through' : 'regular-line-through'}
            checked={task.done}
            isFocused={isFocused}
            onSubmitEditing={() => {
              handleEndEditingTask();
            }}
          />
        </TaskGestureHandlerContainer>
      </InputCheckContainer>

      {!isFocused ? (
        <>
          <ActionButton iconName="edit" onPress={handleStartEditingTask} />
          <ActionButton
            iconName="delete"
            onPress={() => {
              removeTask(task.id);
            }}
          />
        </>
      ) : (
        <>
          <ActionButton
            iconName="confirm"
            onPress={() => {
              handleEndEditingTask();
            }}
          />
          <ActionButton iconName="cancel" onPress={handleCancelEditingTask} />
        </>
      )}
    </Container>
  );
}
