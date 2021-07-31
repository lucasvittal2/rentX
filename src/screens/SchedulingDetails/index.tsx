import React, {useEffect, useState} from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import {getAccesoryIcon} from '../../utils/getAccesoryIcon';
import {Feather} from '@expo/vector-icons';
import { CarDTO } from '../../dtos/CarDTO';
import { format } from 'date-fns';

 
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
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';


interface Params {
    car: CarDTO;
    dates: string[];
}
interface RentalPeriod {
    start: string;
    end: string;
}
export function SchedulingDetails(){
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const {car, dates} = route.params as Params;
    async function handleFinishRental(){
        setLoading(true);
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates
        ];
        await api.post(`/schedules_byuser`, {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(new Date(dates[0])),'dd/MM/yyyy'),
            endDate: format(getPlatformDate(new Date(dates[dates.length - 1])),'dd/MM/yyyy')
        })
        api.put(`/schedules_bycars/${car.id}`,{
            id: car.id,
            unavailable_dates
        }).then(() => {
            setLoading(false);
            navigation.navigate('Confirmation',{
                title: "Carro alugado",
                message: `Agora você só precisa ir \n  até a concessionária da RentX\n pegar seu automóvel`,
                nextScreenRoute: 'Home'
            })
        })
        .catch(()=>{
            setLoading(false);
            Alert.alert("Não foi possível confirma o agendamento")
        });
        
       
    }
    useEffect( () => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])),'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])),'dd/MM/yyyy'),
        })
    }, [])
    return ( 
        <Container>
            <Header>
                <BackButton color = '' onPress={() => navigation.goBack()}/>
            </Header>
            <CarImages>
                <ImageSlider imagesUrl= {car.photos}/>
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period> {car.period} </Period>
                        <Price> R$ {car.price}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {
                     car.accessories.map( (accesory)=> (
                        <Accessory
                        key = {accesory.type}
                        name = {accesory.name}
                        icon = {getAccesoryIcon(accesory.type)}
                        />
                     ))
                    }
                    
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
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>
                    <DateInfo>
                        <DateTile>ATÉ</DateTile>
                        <DateValue>{rentalPeriod.end}</DateValue>
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
                    <RetalProiceQuota>R$ {car.price} x{dates.length} diárias</RetalProiceQuota>
                    <RetailsPriceTotal> R$ {car.price*dates.length}</RetailsPriceTotal>
                </RentalPriceDetails>

            </RentalPrice>
            </Content>
            <Footer>
                <Button
                    title = "Alugar Agora"
                    color={theme.colors.success}
                    onPress={handleFinishRental}
                    enabled = {!loading}
                    loading = {loading}
                />
            </Footer>
        </Container>
    );
}