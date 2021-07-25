import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import {getAccesoryIcon} from '../../utils/getAccesoryIcon';


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
  Footer
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';

interface Parms {
    car: CarDTO;
}
export function CarDetails(){
    const route = useRoute();
    const { car }  =  route.params as Parms;
    const navigation = useNavigation();
    function hadleConfirmRental(){
        navigation.navigate('Schedule', {car});
    }
 return ( 
    <Container>
        <Header>
            <BackButton color = '' onPress={()=>navigation.goBack()}/>
        </Header>
        <CarImages>
            <ImageSlider imageUrl= {car.photos}/>
        </CarImages>
        <Content>
            <Details>
                <Description>
                    <Brand>{car.brand}</Brand>
                    <Name>R$ {car.name}`</Name>
                </Description>
                <Rent>
                    <Period>{car.rent.period} </Period>
                    <Price> R$ {car.rent.price}</Price>
                </Rent>
            </Details>
            <Accessories>
                {
                car.accessories.map( (accessory) => {
                    console.log(getAccesoryIcon(accessory.type));
                        return <Accessory
                        key = {accessory.type}
                        name = {accessory.name}
                        icon={ getAccesoryIcon(accessory.type) }
                        />
                    }) 
                }
            </Accessories>
            <About>{car.about}</About>
        </Content>
        <Footer>
            <Button title = "Escolher Período do Aluguel" onPress={hadleConfirmRental}/>
        </Footer>
    </Container>
  );
}