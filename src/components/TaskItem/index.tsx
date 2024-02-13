// React/React Native and expo imports
import React, { useState, useRef } from 'react';
import { Keyboard, type TextInput } from 'react-native';

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
  const [taskDone, setTaskDone] = useState<boolean>(task.done);

  const { addNewTask, editTaskById, removeTaskById, tasks, toggleTaskDone } = useTaskContext();

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

  function removeTask(id: Task['id']): void {
    removeTaskById(id);
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
            maxLength={30}
            onChangeText={handleTaskTitleChange}
            value={taskTitle}
            selection={selection}
            onSelectionChange={({ nativeEvent: { selection } }) => {
              setSelection(selection);
            }}
            textDecorationLine={taskDone && !isFocused ? 'line-through' : 'regular-line-through'}
            checked={taskDone}
            isFocused={isFocused}
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
          <ActionButton iconName="confirm" onPress={handleEndEditingTask} />
          <ActionButton iconName="cancel" onPress={handleCancelEditingTask} />
        </>
      )}
    </Container>
  );
}
