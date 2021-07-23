import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import {ImageSlider} from '../../components/ImageSlider';


import{
  Container,
  Header,
  TotalCars,
  CarList,
  HeaderContent
} from './styles';

export function Home(){
  const navigation = useNavigation();
  const carData = {
    brand: 'Audi',
    name: "RS 5 Coupé",
    rent: {
        period: 'ao dia',
        price: 120,
    },
    thumbnail: 'https://w7.pngwing.com/pngs/444/585/png-transparent-2018-audi-tt-rs-car-audi-rs5-coupe-audi-compact-car-car-performance-car.png',
  }
  function handleCarDetails(){
    navigation.navigate('CarDetails');
  }
  
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
        <CarList
        data={[1,2,3,4,5,6,7]}
        renderItem={ ({item}) => <Car data={carData}  onPress={handleCarDetails}/> }
        />
    </Container>
  );
}

