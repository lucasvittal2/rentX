import React, { useState } from 'react';
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
import { Calendar, DayProps, generateInterval, MarkedDatesProps } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';

import {format} from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { Alert } from 'react-native';
import { Car as CarModel} from '../../database/model/Car';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}
interface Params {
    car: CarDTO;
}
export function Schedule(){
    const route = useRoute();
    const { car } = route.params as Params;
    const theme = useTheme();
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    const  navigation = useNavigation();
    function handleConfirmRental(){
        navigation.navigate('ScheduleDetails',{
           car,
            dates: Object.keys(markedDates)
        });
    }
 function handleChangeDate(date: DayProps){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;
    let aux;
    if(start.timestamp > end.timestamp){
        aux = start;
        start = end;
        end = aux;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
    setRentalPeriod({
        startFormatted: format(getPlatformDate( new Date(firstDate)), 'dd/MM/yyyy'),
        endFormatted: format(getPlatformDate( new Date(endDate)), 'dd/MM/yyyy')
    })
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
                    <DateValue selected ={!! rentalPeriod.startFormatted}> {rentalPeriod.startFormatted}</DateValue>
                </DateInfo>
                <ArrowSvg/>
                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected ={!! rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
                </DateInfo>      
            </RentalPeriod>
        </Header>
        <Content>
            <Calendar
            markedDates ={markedDates}
            onDayPress = {handleChangeDate}
            
            />
        </Content>
        <Footer>
            <Button
                title="Confirmar"
                onPress ={handleConfirmRental}
                enabled = {!!rentalPeriod.endFormatted}
                />
        </Footer>
    </Container>
  );
}