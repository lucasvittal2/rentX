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
import { useNetInfo} from '@react-native-community/netinfo';
import { CarDTO as Car} from '../../dtos/CarDTO';

interface Params {
    car: CarDTO;
    dates: string[];
}
interface RentalPeriod {
    start: string;
    end: string;
}
export function SchedulingDetails(){
    const [ carUpdated, setCarUpdated] = useState<Car>({} as Car);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const route = useRoute();
    const {car, dates} = route.params as Params;
    const rentTotal = Number(dates.length*car.price)
    async function handleFinishRental(){
        setLoading(true);
       await api.post("/rentals", {
            user_id: 1,
            car_id: car.id,
            start_date: new Date(dates[0]),
            end_date: new Date(dates[dates.length - 1]),
            total: rentTotal
        }).then(() => {
            setLoading(false);
            navigation.navigate('Confirmation',{
                title: "Carro alugado",
                message: `Agora você só precisa ir \n  até a concessionária da RentX\n pegar seu automóvel`,
                nextScreenRoute: 'Home'
            })
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
            Alert.alert("Não foi possível confirma o agendamento")
        });
    }
    useEffect( () => {
        setRentalPeriod({
            start: format(getPlatformDate(new Date(dates[0])),'dd/MM/yyyy'),
            end: format(getPlatformDate(new Date(dates[dates.length - 1])),'dd/MM/yyyy'),
        })
    }, []);

    useEffect( () => {
        async function fetchCarUpdated(){
        const response = await api.get(`/cars/${car.id}`)
        setCarUpdated(response.data);
        }
        if(netInfo.isConnected === true){
            fetchCarUpdated();
        }
        else{
            setCarUpdated(car);
        }
 
  }, [netInfo.isConnected])
    return ( 
        <Container>
            <Header>
                <BackButton color = '' onPress={() => navigation.goBack()}/>
            </Header>
            <CarImages>
                <ImageSlider imagesUrls={
                !! carUpdated.photos?
                carUpdated.photos
                :
                [{id: String(Math.random()) ,photo: carUpdated.thumbnail}]
                } />
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
                {carUpdated.accessories && carUpdated.accessories.map(accessory => (
                    <Accessory
                    key={accessory.type}
                    name={accessory.name}
                    icon={getAccesoryIcon(accessory.type)}
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