import React, { type ReactNode } from 'react';
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

import { type Task, tasks } from '../../data/task';
import { FlatList, type ListRenderItemInfo } from 'react-native';

export function Home(): React.JSX.Element {
  function renderTasks({ item }: ListRenderItemInfo<Task>): ReactNode {
    return <TaskItem {...item} />;
  }

  return (
    <Container>
      <Header>
        <LogoutButtonContainer>
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
          <NewTaskInput
            iconName="plus"
            placeholder="Adicione uma tarefa"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="sentences"
            // onChangeText={() = {}}
            // value={}
          />
        </TaskInputContainer>
      </Header>

      <Body>
        <TaskCountersContainer>
          <CounterContainer finished={false}>
            <TasksInfo finished={false}>Total</TasksInfo>
            <TasksCount finished={false}>2</TasksCount>
          </CounterContainer>
          <CounterContainer finished={true}>
            <TasksInfo finished={true}>Concluídas</TasksInfo>
            <TasksCount finished={true}>1</TasksCount>
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
  );
}
