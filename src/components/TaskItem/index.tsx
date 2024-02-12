// React/React Native and expo imports
import React, { useState, useRef } from 'react';
import { Keyboard, type TextInput } from 'react-native';

// Components imports
import { ActionButton } from './ActionButton';
import { Checkbox } from './Checkbox';

// Styles imports
import { InputCheckContainer, Container, InputText, TaskGestureHandlerContainer } from './styles';

export function TaskItem(): React.JSX.Element {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('sdasd');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [taskDone, setTaskDone] = useState<boolean>(false);

  const taskInput = useRef<TextInput>(null);

  function handleInputFocus(): void {
    setIsFocused(true);
  }

  function handleInputBlur(): void {
    setIsFocused(false);
  }

  function handleChangeTaskStatus(): void {
    setTaskDone((prevState) => !prevState);
  }

  function handleTaskTitleChange(title: string): void {
    setTaskTitle(title);
  }

  function handleStartEditingTask(): void {
    // const currentTitle = taskTitle;
    taskInput.current?.focus();
    handleInputFocus();
    setSelection({ start: taskTitle.length, end: taskTitle.length });
  }

  function handleEndEditingTask(): void {
    taskInput.current?.blur();
    handleInputBlur();
    Keyboard.dismiss();
    // CODE: create change task title
  }

  function handleCancelEditingTask(): void {
    // const currentTitle = taskTitle;
    taskInput.current?.blur();
    handleInputBlur();
    Keyboard.dismiss();
  }

  return (
    <Container>
      <InputCheckContainer onPress={handleChangeTaskStatus}>
        <TaskGestureHandlerContainer pointerEvents={isFocused ? 'auto' : 'none'}>
          {!isFocused && <Checkbox checked={taskDone} />}
          <InputText
            ref={taskInput}
            multiline={false}
            numberOfLine={1}
            horizontal={true}
            scrollEnabled={false}
            // editable={isFocused}
            maxLength={25}
            onChangeText={handleTaskTitleChange}
            value={taskTitle}
            selection={selection}
            onSelectionChange={({ nativeEvent: { selection } }) => {
              setSelection(selection);
            }}
            textDecorationLine={taskDone && !isFocused ? 'line-through' : 'regular-line-through'}
            checked={taskDone}
          />
        </TaskGestureHandlerContainer>
      </InputCheckContainer>

      {!isFocused ? (
        <>
          <ActionButton iconName="edit" onPress={handleStartEditingTask} />
          <ActionButton iconName="delete" />
        </>
      ) : (
        <>
          <ActionButton iconName="confirm" onPress={handleEndEditingTask} />
          <ActionButton iconName="cancel" onPress={handleCancelEditingTask} />
        </>
      )}
    </Container>
  );
}
