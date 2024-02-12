import React from 'react';
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
  Title,
} from './styles';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../styles/theme';
import { NewTaskInput } from '../../components/NewTaskInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { TaskItem } from '../../components/TaskItem';

export function Home(): React.JSX.Element {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
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

          {/* Create a conditional to list tasks components */}
          <EmptyListContainer>
            <FontAwesome5 name="tasks" size={RFValue(36)} color={theme.colors.text_light} />
            <EmptyListMainMessage>Nenhuma tarefa cadastrada.</EmptyListMainMessage>
            <EmptyListSecondaryMessage>
              Entre com o título da tarefa e toque no
              <EmptyListFeaturedTextIcon>“+”</EmptyListFeaturedTextIcon>
              para cadastrar.
            </EmptyListSecondaryMessage>
          </EmptyListContainer>

          {/* CODE: Create list to render task items */}
          {/* <TaskItem /> */}
        </Body>
      </Container>
    </KeyboardAwareScrollView>
  );
}
