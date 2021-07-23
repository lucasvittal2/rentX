import React from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import{
    Container,
    Header,
    ButtonBack,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';
import ArrowSvg from '../../assets/arrow.svg';
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';
export function Schedule(){
    const theme = useTheme();
    const  navigation = useNavigation();
    function handleConfirmRental(){
        navigation.navigate('ScheduleDetails');
    }
 return ( 
    <Container>
        <StatusBar
            barStyle = 'light-content'
            translucent
            backgroundColor = 'transparent'
            
            />
        <Header>
        <ButtonBack> 
        <BackButton
            color = {theme.colors.shape}
            onPress={() => navigation.goBack()}/>
        </ButtonBack>           
            <Title> 
                Escolha uma {'\n'}
                data de início e {'\n'}
                fim do Aluguel
            </Title>
            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected ={false}></DateValue>
                </DateInfo>
                <ArrowSvg/>
                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected ={false}></DateValue>
                </DateInfo>      
            </RentalPeriod>
        </Header>
        <Content>
            <Calendar/>
        </Content>
        <Footer>
            <Button title="Confirmar" onPress ={handleConfirmRental}/>
        </Footer>
    </Container>
  );
}