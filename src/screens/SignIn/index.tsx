import React, { useState } from 'react';

import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  LogoContainer,
  ErrorMessageContainer,
  ErrorMessage,
  FormButtonContainer,
  DeleteAccountButtonContainer,
  MainContent,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

export function SignIn(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <MainContent>
          <Header>
            <LogoContainer>
              <Logo width={RFValue(46)} height={RFValue(46)} />
              <Title>Lista de tarefas</Title>
            </LogoContainer>
            <SubTitle>Crie tarefas e organize seu dia</SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <ErrorMessageContainer>
            <ErrorMessage>{``}</ErrorMessage>
          </ErrorMessageContainer>

          <FormButtonContainer>
            <Button title="Login" enabled={true} loading={false} onPress={() => {}} />

            <Button
              title="Cadastrar"
              color={theme.colors.background_details}
              enabled={true}
              loading={false}
              onPress={() => {}}
            />
          </FormButtonContainer>
        </MainContent>
        <DeleteAccountButtonContainer>
          <Button
            title="Excluir cadastro"
            color={theme.colors.warning_light}
            removeType
            enabled={true}
            loading={false}
            onPress={() => {}}
          />
        </DeleteAccountButtonContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
}
