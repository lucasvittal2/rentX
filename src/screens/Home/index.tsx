import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState} from 'react';
import { StatusBar, Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import {Ionicons} from '@expo/vector-icons';
import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { ImageSlider } from '../../components/ImageSlider';
import { Load } from '../../components/Load';


import{
  Container,
  Header,
  TotalCars,
  CarList,
  HeaderContent,
  MyCarsButton
} from './styles';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';


export function Home(){
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  function handleCarDetails(car: CarDTO){
    navigation.navigate('CarDetails', { car });
  }
  function handleOpenMyCars(){
    navigation.navigate('MyCars');
  }
  useEffect(() =>{
    async function fetchCars(){
      try{
        const response = await api.get('/cars');
        setCars(response.data);
      }catch(error){
        Alert.alert('Erro: Não foi possível obter dados do servidor');
      }finally{
        setLoading(false);
      }
    }
    fetchCars();
  }, [])
 
 return ( 
    <Container>
      <StatusBar
      barStyle = "light-content"
      translucent
      backgroundColor = 'transparent'
      />
        <Header>
          <HeaderContent>
            <Logo
                width ={RFValue(108)}
                height ={RFValue(12)}
            />
              <TotalCars>
                Total de 12 carros
            </TotalCars>
          </HeaderContent>
           
        </Header>
       {loading? <Load/> :<CarList
        data={cars}
        keyExtractor = { item => String(item.id)}
        renderItem={ ({item}) => <Car data={item}  onPress={()=>handleCarDetails(item)}/> }
        />}
      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name='ios-car-sport'
          size = {32}
          color = {theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}

