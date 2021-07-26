import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import{
  Container,
  Header,
  Title,
  SubTitle,
  Footer,
  Form
} from './styles';

export function SignIn(){
  const theme = useTheme();
 return ( 
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
          />
      </Form>
 
      <Footer>
          <Button
          title='Login'
          onPress={()=>{}}
          enabled={false}
          loading={false}
          />
           <Button
          title='Criar Conta Gratuita'
          color = {theme.colors.background_secondary}
          onPress={()=>{}}
          enabled={false}
          loading={false}
          light = {true}
          />
      </Footer>
    </Container>
  );
}