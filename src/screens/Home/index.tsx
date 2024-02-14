import React, { useMemo, type ReactNode, useEffect, useRef } from 'react';
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
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/theme';
import { NewTaskInput } from '../../components/NewTaskInput';
import { TaskItem } from '../../components/TaskItem';

import auth from '@react-native-firebase/auth';

import { type Task } from '../../contexts/taskContext/taskType';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  type ListRenderItemInfo,
  Animated,
  Platform,
} from 'react-native';

import { useTaskContext } from '../../contexts/taskContext';

export function Home(): React.JSX.Element {
  const { tasks } = useTaskContext();
  const animatedValue = useRef(new Animated.Value(0)).current;

  // function renderTasks({ item }: ListRenderItemInfo<Task>): ReactNode {
  //   return <TaskItem {...item} />;
  // }

  const totalTasksDone = useMemo(() => {
    return tasks.reduce((total, task) => (task.done ? total + 1 : total), 0);
  }, [tasks]);

  const handleKeyboardDidShow = () => {
    Animated.timing(animatedValue, {
      toValue: tasks.length > 2 ? (Platform.OS === 'ios' ? -320 : -220) : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  function signOut() {
    auth().signOut();
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   keyboardVerticalOffset={20}
    //   style={{ flex: 1 }}
    // ></KeyboardAvoidingView>
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
                renderItem={({ item }) => (
                  <Animated.View style={{ transform: [{ translateY: animatedValue }] }}>
                    <TaskItem {...item} />
                  </Animated.View>
                )}
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
