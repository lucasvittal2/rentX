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
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
    title: string;
    message: string;
    nextScreenRoute: string;
}

export function Confirmation(){
    
    const route = useRoute();
    const { title, message, nextScreenRoute } = route.params as Params;
    const {width} = useWindowDimensions();
    const navigation = useNavigation();
    function handleRestartProcess(){
        navigation.navigate(nextScreenRoute);
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
                    <Title>{title}</Title>
                    <Message>
                        {message}
                    </Message>
                </Content>
                
                <Footer>
                    <ConfirmButton title = "OK" onPress={handleRestartProcess}/>
                </Footer>
            </Wrapper>
    </Container>
  );
}