// React/React Native imports
import React, { useMemo } from 'react';
import { FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';

// Esternal icons imports
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// External imports for responsive design
import { RFValue } from 'react-native-responsive-fontsize';

// Local components imports
import { NewTaskInput } from '../../components/NewTaskInput';
import { TaskItem } from '../../components/TaskItem';

// External lib imports for authentication
import auth from '@react-native-firebase/auth';

// Global context import
import { type Task } from '../../contexts/taskContext/taskType';
import { useTaskContext } from '../../contexts/taskContext';

// Local images imports
import Logo from '../../assets/logo.svg';

// Styles imports
import theme from '../../styles/theme';
import {
  AppHeroContainer,
  Body,
  Container,
  CounterContainer,
  EmptyListContainer,
  EmptyListFeaturedTextIcon,
  EmptyListMainMessage,
  EmptyListSecondaryMessage,
  Header,
  LogoContainer,
  LogoutButtonContainer,
  SubTitle,
  TaskCountersContainer,
  TaskInputContainer,
  TasksCount,
  TasksInfo,
  TasksListContainer,
  Title,
} from './styles';

export function Home(): React.JSX.Element {
  const { tasks, setStorageKey } = useTaskContext();

  function renderTasks({ item }): React.JSX.Element {
    return <TaskItem {...item} />;
  }

  const totalTasksDone = useMemo(() => {
    return tasks.reduce((total, task) => (task.done ? total + 1 : total), 0);
  }, [tasks]);

  async function signOut(): Promise<void> {
    try {
      setStorageKey('');
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <LogoutButtonContainer onPress={signOut}>
            <MaterialCommunityIcons name="logout" size={RFValue(28)} color={theme.colors.shape} />
          </LogoutButtonContainer>
          <AppHeroContainer>
            <LogoContainer>
              <Logo width={RFValue(36)} height={RFValue(36)} />
              <Title>Lista de tarefas</Title>
            </LogoContainer>
            <SubTitle>Crie tarefas e organize seu dia</SubTitle>
          </AppHeroContainer>
          <TaskInputContainer>
            <NewTaskInput />
          </TaskInputContainer>
        </Header>

        <Body>
          <TaskCountersContainer>
            <CounterContainer finished={false}>
              <TasksInfo finished={false}>Total</TasksInfo>
              <TasksCount finished={false}>{tasks.length}</TasksCount>
            </CounterContainer>
            <CounterContainer finished={true}>
              <TasksInfo finished={true}>Concluídas</TasksInfo>
              <TasksCount finished={true}>{totalTasksDone}</TasksCount>
            </CounterContainer>
          </TaskCountersContainer>

          {tasks.length > 0 ? (
            <TasksListContainer>
              <FlatList
                data={tasks}
                keyExtractor={(item: Task) => item.id}
                renderItem={renderTasks}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 8,
                  paddingBottom: 32,
                }}
              />
            </TasksListContainer>
          ) : (
            <EmptyListContainer>
              <FontAwesome5 name="tasks" size={RFValue(36)} color={theme.colors.text_light} />
              <EmptyListMainMessage>Nenhuma tarefa cadastrada.</EmptyListMainMessage>
              <EmptyListSecondaryMessage>
                Entre com o título da tarefa e toque no
                <EmptyListFeaturedTextIcon>“+”</EmptyListFeaturedTextIcon>
                para cadastrar.
              </EmptyListSecondaryMessage>
            </EmptyListContainer>
          )}
        </Body>
      </Container>
    </TouchableWithoutFeedback>
  );
}
