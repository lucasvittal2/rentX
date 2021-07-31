import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
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

import{
  Container,
  Header,
  Bullets,
  Title,
  SubTitle,
  Footer,
  Form,
  FormTitle
} from './styles';

export function SignUpFirstStep(){
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driveLicense, setDriveLicense] = useState('');
  const theme = useTheme();
  const navigation = useNavigation();
 
  async function handleGotoNextSignUpStep(){
   try {
     const schema = Yup.object().shape({
       name: Yup.string()
       .required("Nome é obrigatório"),
       email: Yup.string()
       .email('E-mail é inválido')
       .required("E-mail é obrigatório"),
       driveLicense: Yup.string()
       .required('CNH é obrigatório')
     });
     const data = { name, email, driveLicense};
     await schema.validate(data);
    navigation.navigate('SignUpSecondStep',{user: data})    
   } catch (error) {
     if(error instanceof Yup.ValidationError){
       return Alert.alert('Opa', error.message);
     }
   }
  }

  function handleGoBack(){
    navigation.goBack();
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
          <Header>
            <StatusBar
            barStyle = 'dark-content'
            backgroundColor = 'transparent'
            translucent
            />
             <BackButton
              onPress={ handleGoBack }
              color = {theme.colors.text}
            />
            <Bullets>
              <Bullet active />
              <Bullet active = {false}/>
            </Bullets>
            
            
              <Title>
                Crie sua{'\n'}
                conta
              </Title>
              <SubTitle>
                Faça seu cadastro de {'\n'}
                forma rápida e fácil
              </SubTitle>
            </Header>
            <Form>
                <FormTitle>
                  1. Dados
                </FormTitle>
                <Input
                  iconName ='user'
                  placeholder = "Nome de usuário"
                  autoCorrect = {false}
                  autoCapitalize = 'none'
                  onChangeText = { setName }
                  value ={ name }
                />
                <Input
                  iconName ="mail"
                  placeholder = "E-mail"
                  keyboardType = "email-address"
                  autoCorrect = {false}
                  autoCapitalize = 'none'
                  onChangeText = {setEmail}
                  value ={ email }
                />
                <Input
                  iconName ='credit-card'
                  placeholder = "CNH"
                  keyboardType = "numeric"
                  autoCorrect = {false}
                  autoCapitalize = 'none'
                  onChangeText = { setDriveLicense }
                  value ={ driveLicense }
                />
            </Form>
      
            <Footer>
                <Button
                title='Próximo'
                onPress={handleGotoNextSignUpStep}
                enabled={!! email && !!driveLicense && !!name}
                loading={false}
                />
            </Footer>
        </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}