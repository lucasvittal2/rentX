import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';


import {Feather} from '@expo/vector-icons';




 
import{
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTile,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RetalProiceQuota,
    RetailsPriceTotal,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

export function SchedulingDetails(){
    const theme = useTheme();
    const navigation = useNavigation();
    function handleFinishRental(){
        navigation.navigate('ScheduleComplete')
    }
    return ( 
        <Container>
            <Header>
                <BackButton color = '' onPress={() =>{}}/>
            </Header>
            <CarImages>
                <ImageSlider imageUrl= {['https://w7.pngwing.com/pngs/444/585/png-transparent-2018-audi-tt-rs-car-audi-rs5-coupe-audi-compact-car-car-performance-car.png']}/>
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>Lanboguini</Brand>
                        <Name>Huracan</Name>
                    </Description>
                    <Rent>
                        <Period> ao dia </Period>
                        <Price> R$ 580,00</Price>
                    </Rent>
                </Details>
                <Accessories>

                    <Accessory name = "380km/H" icon={speedSvg} />
                    <Accessory name = "3.2s" icon={accelerationSvg} />
                    <Accessory name = "800Hp" icon={forceSvg}/>
                    <Accessory name = "Gasolina" icon={gasolineSvg} />
                    <Accessory name = "Auto" icon={exchangeSvg} />
                    <Accessory name = "2 Pessoas" icon={peopleSvg}/>
                </Accessories>
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name = 'calendar'
                            size = {RFValue(24)}
                            color = {theme.colors.shape}
                        />
                    </CalendarIcon>
                    <DateInfo>
                        <DateTile>DE</DateTile>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>
                    <DateInfo>
                        <DateTile>DE</DateTile>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>
                    <Feather
                        name ='chevron-right'
                        size = {RFValue(10)}
                        color = {theme.colors.shape}
                    />
                </RentalPeriod>
            
            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RetalProiceQuota>R$ 580 x3 diárias</RetalProiceQuota>
                    <RetailsPriceTotal> R$ 2.900</RetailsPriceTotal>
                </RentalPriceDetails>

            </RentalPrice>
            </Content>
            <Footer>
                <Button title = "Alugar Agora" color={theme.colors.success} onPress={handleFinishRental}/>
            </Footer>
        </Container>
    );
}