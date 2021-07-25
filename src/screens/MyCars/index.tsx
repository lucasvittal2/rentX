import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
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

interface CarProps {
    car:  CarDTO;
    user_id: string;
    id: string;
    startDate: string;
    endDate: string;
}
export function MyCars(){
    const [cars, setCars ] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const theme = useTheme();
    const navigation = useNavigation();
    useEffect( ()=>{
        async function fetchCars(){
            try{
                const response = await api.get(`/schedules_byuser/?user_id=1`);
                setCars(response.data);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCars();
    }, [])
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
                                <CarFooterDate>{item.startDate}</CarFooterDate>
                                <AntDesign
                                    name ="arrowright"
                                    size = {20}
                                    color = {theme.colors.title}
                                    style = {{ marginHorizontal: 10}}
                                />
                                <CarFooterDate>{item.endDate}</CarFooterDate>
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