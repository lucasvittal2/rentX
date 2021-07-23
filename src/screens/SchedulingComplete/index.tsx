import React from 'react';
import { useWindowDimensions } from 'react-native';

import  LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import{
  Container,
  Wrapper,
  Content,
  Title,
  Message,
  Footer,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function SchedulingComplete(){
    const {width} = useWindowDimensions();
    const navigation = useNavigation();
    function handleRestartProcess(){
        navigation.navigate('Home');
    }
 return ( 
    <Container>
        <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor = 'transparent'
        />
            <Wrapper>
                <Content>
                <LogoSvg widt={width}/>
                    <DoneSvg width={80} height={80}/>
                    <Title> Carro Alugado</Title>
                    <Message>
                        Agora você só precisa ir{'\n'}
                        até a concessionária da RENTX{'\n'}
                        pega o seu automóvel.
                    </Message>
                </Content>
                
                <Footer>
                    <ConfirmButton title = "OK" onPress={handleRestartProcess}/>
                </Footer>
            </Wrapper>
    </Container>
  );
}