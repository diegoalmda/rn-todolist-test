import React, { useEffect, useState } from 'react';

import { useTheme } from 'styled-components';

import { ZodError, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { PasswordInput } from '../../components/Form/PasswordInput';
import { ActivityIndicator, Alert, Keyboard } from 'react-native';

import auth from '@react-native-firebase/auth';

const userDataFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail inválido' })
    .email('E-mail inválido')
    .max(35, { message: 'Máximo 35 caracteres para e-mail' }),
  password: z
    .string()
    .min(6, { message: 'Mínimo 6 caracteres para senha' })
    .max(20, { message: 'Máximo 20 caracteres para senha' }),
});

// type SendUserFormData = z.infer<typeof userDataFormSchema>;

export function SignIn(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  

  const theme = useTheme();

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<SendUserFormData>({
  //   resolver: zodResolver(userDataFormSchema),
  // });

  // const onInvalid = (errors) => {
  //   console.error('onINvalid', errors);
  // };

  // const onSubmit: SubmitHandler<SendUserFormData> = (data: SendUserFormData) => {
  //   Alert.alert('IK AHJSDFUIOASHDOPIU');
  //   console.log(errors);
  //   console.log('onSubmit called');
  //   console.log('Submit data:', data);
  // };

  function validateUserData() {
    try {
      const data = { email, password };
      userDataFormSchema.parse(data);
      return { isValid: true, error: '' };
    } catch (error) {
      if (error instanceof ZodError) {
        setFormError(error.errors[0]?.message);
        return { isValid: false, error: error.errors[0]?.message };
      }
      throw error;
    }
  }

  function handleSignIn() {
    const { isValid } = validateUserData();
    
    if (isValid) {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/wrong-password') {
            setFormError('Usuário não encontrado');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleRegister() {
    const { isValid } = validateUserData();

    if (isValid) {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userRecord) => {
          console.log(userRecord.user.uid);
          Alert.alert('Conta', 'Cadastrado com sucesso!');
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            setFormError('E-mail já cadastrado');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  // function handleDeleteAccount() {
  //   const { isValid } = validateUserData();
  //   if (isValid) {
  //     let user = auth().currentUser;

  //     if (user) {
  //       user
  //         .delete()
  //         .then(() => console.log("User deleted"))
  //         .catch((error) => console.log(error));
  //         console.log('delete', email, password);
  //     }
  //   }
  // }

  

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="never"
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
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />

            <PasswordInput 
              placeholder="Senha" 
              onChangeText={setPassword} 
              value={password} 
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
          </Form>

          <ErrorMessageContainer>
            <ErrorMessage>{formError}</ErrorMessage>
            {
              isLoading &&
              <ActivityIndicator 
                color={theme.colors.background_details}
                size="small"
              /> 
            }
          </ErrorMessageContainer>

          <FormButtonContainer>
            <Button title="Login" enabled={!isLoading} loading={isLoading} onPress={handleSignIn}  />

            <Button
              title="Cadastrar"
              color={theme.colors.background_details}
              enabled={!isLoading}
              loading={isLoading}
              onPress={handleRegister}              
            />
          </FormButtonContainer>
        </MainContent>
        {/* <DeleteAccountButtonContainer>
          <Button
            title="Excluir cadastro"
            color={theme.colors.warning_light}
            removeType
            enabled={true}
            loading={false}
            onPress={handleDeleteAccount}
          />
        </DeleteAccountButtonContainer> */}
      </Container>
    </KeyboardAwareScrollView>
  );
}
