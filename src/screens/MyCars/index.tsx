import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar} from '../../database/model/Car';
import { api } from '../../services/api';
import { AntDesign } from '@expo/vector-icons';
import{
    Container,
    Header,
    ButtonBack,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPerior,
    CarFooterDate,
    
} from './styles';
import { LoadAnimation } from '../../components/LoadAnimation';
import { format, parseISO} from 'date-fns';


interface DataProps{
    id: string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}
export function MyCars(){
    const [cars, setCars ] = useState<DataProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const theme = useTheme();
    const screenIsFocused = useIsFocused();
    const navigation = useNavigation();
    useEffect( ()=>{
        async function fetchCars(){
            try{
                const response = await api.get(`/rentals`);
                const dateFormatted = response.data.map( (data: DataProps) =>{
                    return {
                        id: data.id,
                        car: data.car,
                        start_data: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.start_date), 'dd/MM/yyyy')

                    }
                })
                setCars(dateFormatted);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCars();
    }, [screenIsFocused]);
    return ( 
        <Container>
            <Header>
                <ButtonBack>
                
                <BackButton
                    color = {theme.colors.shape}
                    onPress={() => navigation.goBack()}/>
                </ButtonBack>           
                    <Title> 
                        Seus agendamentos{'\n'}
                        estão aqui.
                    </Title>
            
                <SubTitle>
                    Conforto, Segurança e praticidade
                    
                </SubTitle>
            </Header>
            {
            loading?
            <View style={{
                marginTop:95,
                marginLeft: 40

            }}>
                <LoadAnimation/>
            </View>
            
            :
            <Content>
                <Appointments>
                    <AppointmentsTitle> Agendamente feitos</AppointmentsTitle>
                    <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>

                </Appointments>
                <FlatList
                    data = {cars}
                    keyExtractor = { item => item.id}
                    showsVerticalScrollIndicator = {false}
                    renderItem = { ({item})=> (
                        <CarWrapper>
                        <Car
                            data = {item.car}
                        />
                        <CarFooter>
                            <CarFooterTitle> Periodo </CarFooterTitle>
                            <CarFooterPerior>
                                <CarFooterDate>{item.start_date}</CarFooterDate>
                                <AntDesign
                                    name ="arrowright"
                                    size = {20}
                                    color = {theme.colors.title}
                                    style = {{ marginHorizontal: 10}}
                                />
                                <CarFooterDate>{item.end_date}</CarFooterDate>
                            </CarFooterPerior>
                        </CarFooter>
                        </CarWrapper>
                    )}
                />

            </Content>
            }

        </Container>
    );
}