import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated , {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import {getAccesoryIcon} from '../../utils/getAccesoryIcon';


import{
  Container,
  Header,
  CarImages,
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
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

interface Parms {
    car: CarDTO;
}
export function CarDetails(){
    const theme = useTheme();
    const route = useRoute();
    const { car }  =  route.params as Parms;
    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event=>{
        scrollY.value = event.contentOffset.y;
    });
    const navigation = useNavigation();
    const headerStyleAnimation = useAnimatedStyle( () => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
                )
        }
    })
    const sliderCarsStyleAnimation = useAnimatedStyle( () => {
        return{
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        };
    });
    function hadleConfirmRental(){
        navigation.navigate('Schedule', {car});
    }
 return ( 
    <Container>
        <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"
        />
        <Animated.View
            style={[headerStyleAnimation, styled.header]}
        >
            <Header>
                <BackButton
                onPress={()=>navigation.goBack()}
                />
            </Header>
            <Animated.View
                style = {[
                    sliderCarsStyleAnimation,
                    {backgroundColor: theme.colors.background_secondary}
                ]}
            >
                <CarImages>
                    <ImageSlider imagesUrl= {car.photos}/>
                </CarImages>
            </Animated.View>
        </Animated.View>
        <Animated.ScrollView
        contentContainerStyle = {{
            paddingHorizontal: 24,
            paddingTop: getStatusBarHeight() +160,

        }}
        showsVerticalScrollIndicator = {false}
        onScroll = {scrollHandler}
        scrollEventThrottle={5}
        >
            <Details>
                <Description>
                    <Brand>{car.brand}</Brand>
                    <Name>R$ {car.name}`</Name>
                </Description>
                <Rent>
                    <Period>{car.period} </Period>
                    <Price> R$ {car.price}</Price>
                </Rent>
            </Details>
            <Accessories>
                {
                car.accessories.map( (accessory) => {
                        return <Accessory
                        key = {accessory.type}
                        name = {accessory.name}
                        icon={ getAccesoryIcon(accessory.type) }
                        />
                    }) 
                }
            </Accessories>
            <About>
                {car.about}
                {car.about}

                {car.about}
                {car.about}

            </About>
        </Animated.ScrollView>
        <Footer>
            <Button title = "Escolher Período do Aluguel" onPress={hadleConfirmRental}/>
        </Footer>
    </Container>
  );
}
const styled = StyleSheet.create({
    header:{
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,

    }
})