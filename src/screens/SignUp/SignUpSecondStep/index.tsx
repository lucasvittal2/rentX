import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { PasswordInput } from '../../../components/PasswordInput';
import { api } from '../../../services/api';
import {Confirmation} from '../../Confirmation';

import{
  Container,
  Header,
  Bullets,
  Title,
  SubTitle,
  Form,
  FormTitle,
  Footer

} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driveLicense: string;
  }
}

export function SignUpSecondStep(){
  const [confirmPassword, setCofirmPassword] = useState('');
  const [password,setPassword] = useState('');
  const theme = useTheme();
  const navigation = useNavigation();
  const route  = useRoute();
  const { user } = route.params as Params;

  function handleGoBack(){
    navigation.goBack();
  }
  async function handleRegister(){
    if(password === confirmPassword){
      //then password is valid
     
      
      // enviar para api o cadastro
      await api.post('/users',{
        name: user.name,
        email: user.email,
        driver_license: user.driveLicense,
        password,
      })
      .then( () => {
          navigation.navigate('Confirmation', {
          title: "Conta Criada",
          message: `Agora é só fazer login \ne aproveitar`,
          nextScreenRoute: 'SignIn'
        })
      })
      .catch( () => {
        Alert.alert("Opa, não foi possível Cadastrar");
      })
    }
    else if(!password || !confirmPassword){
      return Alert.alert('Informe a senha e a confirmação dela');
    }
    else{
      //then password is not valid
      return Alert.alert('Os as senhas fornecidas aos campos devem ser iguais.')

    }
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
              <BackButton
                onPress={ handleGoBack }
                color = {theme.colors.text}
              />
          <Header>
          <BackButton
              onPress={ handleGoBack }
              color = {theme.colors.text}
            />
            <Bullets>
              <Bullet active = {false} />
              <Bullet active/>
              
            </Bullets>
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
            <FormTitle> 2. Senha </FormTitle>
            <PasswordInput
                iconName ="lock"
                placeholder = "Senha"
                onChangeText = { setPassword }
                value = { password } 
                
              />
              <PasswordInput
                iconName ="lock"
                placeholder = "Confime a senha"
                onChangeText = { setCofirmPassword }
                value = { confirmPassword } 
              />
          </Form>
    
          <Footer>
              <Button
              title='Cadastrar'
              color = {theme.colors.success}
              onPress={handleRegister}
              enabled={!! confirmPassword && !!password}
              loading={false}
              />
          </Footer>
        </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}