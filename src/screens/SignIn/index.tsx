import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import *  as Yup from 'yup';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { useAuth } from '../../hook/auth';

import{
  Container,
  Header,
  Title,
  SubTitle,
  Footer,
  Form
} from './styles';
import { Alert } from 'react-native';

export function SignIn(){
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const theme = useTheme();
  const { signIn } = useAuth();
  const navigation = useNavigation();




  async function handleSignIn(){
    const schema = Yup.object().shape({
      email: Yup.string()
      .required("E-mail obrigatório")
      .email('Digite um e-mail válido'),
      password: Yup.string()
      .required('Senha é obrigatória')
    });
    try{
      await schema.validate({email, password});
      signIn({
        email, password
      });
      navigation.navigate('Home');
    }catch(error){
      if( error instanceof Yup.ValidationError){
        return Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro na Autenticação', 
        'Ocorreu um erro ao fazer login, veirifique as suas credencias'
        );
      }

    }

  }
  function handleCreateNewAccount(){
    navigation.navigate('SignUpFirstStep');
  }
 return ( 
   <KeyboardAvoidingView
    behavior='position'
    enabled
   >
     <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
     >
        <Container>
        <StatusBar
        barStyle = 'dark-content'
        backgroundColor = 'transparent'
        translucent
        />
        <Header>
          <Title>
            Estamos {'\n'}
            quase lá.
          </Title>
          <SubTitle>
            Faça seu login para {'\n'}
            uma experiência incrível.
          </SubTitle>
        </Header>
        <Form>
            <Input
              iconName ="mail"
              placeholder = "E-mail"
              keyboardType = "email-address"
              autoCorrect = {false}
              autoCapitalize = 'none'
              onChangeText = {setEmail}
              value ={ email }
            />
            <PasswordInput
              iconName ="lock"
              placeholder = "Senha"
              onChangeText = { setPassword }
              value = { password } 
              
            />
        </Form>
  
        <Footer>
            <Button
            title='Login'
            onPress={handleSignIn}
            enabled={!! email && !!password}
            loading={false}
            />
            <Button
            title='Criar Conta Gratuita'
            color = {theme.colors.background_secondary}
            onPress={handleCreateNewAccount}
            enabled={true}
            loading={false}
            light = {true}
            />
        </Footer>
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}