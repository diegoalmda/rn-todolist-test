// React/React Native and expo imports
import React from 'react';

// Components imports
import { ActionButton } from './ActionButton';
import { Checkbox } from './Checkbox';

// Global context imports
import { type Task } from '../../contexts/taskContext/taskType';
import { useTaskContext } from '../../contexts/taskContext';

// Styles imports
import { InputCheckContainer, Container, InputText, TaskGestureHandlerContainer } from './styles';

export function TaskItem(task: Task): React.JSX.Element {
  const { removeTaskById, toggleTaskDone } = useTaskContext();

  function handleChangeTaskStatus(id: Task['id']): void {
    toggleTaskDone(id);
  }

  function removeTask(id: Task['id']): void {
    removeTaskById(id);
  }

  return (
    <Container>
      <InputCheckContainer
        onPress={() => {
          handleChangeTaskStatus(task.id);
        }}
      >
        <TaskGestureHandlerContainer pointerEvents={'none'}>
          <Checkbox checked={task.done} />
          <InputText
            multiline={false}
            numberOfLine={1}
            horizontal={true}
            scrollEnabled={false}
            maxLength={50}
            value={task.title}
            editable={false}
            textDecorationLine={task.done ? 'line-through' : 'regular-line-through'}
            checked={task.done}
          />
        </TaskGestureHandlerContainer>
      </InputCheckContainer>

      <ActionButton
        onPress={() => {
          removeTask(task.id);
        }}
      />
    </Container>
  );
}
