// React/React native imports
import React, { useState } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';

// External libs imports for layout and responsive design
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

// External libs imports for validation
import { ZodError, z } from 'zod';

// External libs imports for user interaction
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// External libs imports for authentication
import auth from '@react-native-firebase/auth';

// Images imports
import Logo from '../../assets/logo.svg';

// Local components imports
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { PasswordInput } from '../../components/Form/PasswordInput';

// Styles imports
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
  MainContent,
} from './styles';
interface ValidateUserProps {
  isValid: boolean;
  error: string;
}

// Form validation schema
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

export function SignIn(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  function validateUserData(): ValidateUserProps {
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

  function handleSignIn(): void {
    const { isValid } = validateUserData();

    if (isValid) {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            setFormError('Usuário não encontrado');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleRegister(): void {
    const { isValid } = validateUserData();

    if (isValid) {
      setIsLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userRecord) => {
          // console.log(userRecord.user.uid);
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
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
          </Form>

          <ErrorMessageContainer>
            <ErrorMessage>{formError}</ErrorMessage>
          </ErrorMessageContainer>
          {isLoading && <ActivityIndicator color={theme.colors.background_details} size="small" />}

          <FormButtonContainer>
            <Button title="Login" enabled={!isLoading} loading={isLoading} onPress={handleSignIn} />

            <Button
              title="Cadastrar"
              color={theme.colors.background_details}
              enabled={!isLoading}
              loading={isLoading}
              onPress={handleRegister}
            />
          </FormButtonContainer>
        </MainContent>
      </Container>
    </KeyboardAwareScrollView>
  );
}
