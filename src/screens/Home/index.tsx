import { useNavigation } from '@react-navigation/native';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'
import React, { useEffect, useState} from 'react';
import { StatusBar, Alert, StyleSheet, Button } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import {database} from '../../database';
import { Car as ModelCar} from '../../database/model/Car';
import Animated,{
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import {LoadAnimation} from '../../components/LoadAnimation'
import { Load } from '../../components/Load';



import{
  Container,
  Header,
  TotalCars,
  CarList,
  HeaderContent,
  ContentWrapper
} from './styles';

import { api } from '../../services/api';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarDTO';


export function Home(){
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const myCarsButtonStyled = useAnimatedStyle( () => {
    return{
    transform:  [
        {translateX: positionX.value},
        {translateY: positionY.value},
      ] 
    };
  });
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context: any){
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event, context: any){
      positionX.value = event.translationX + context.positionX;
      positionY.value = event.translationY + context.positionY;
    },
    onEnd(event, context){
      positionX.value = withSpring( event.translationX + context.positionX - 50);
      positionY.value = withSpring(event.translationY + context.positionY - 50);
    }
  });
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  function handleCarDetails(car: CarDTO){
    navigation.navigate('CarDetails', { car });
  }
  function handleOpenMyCars(){
    navigation.navigate('MyCars');
  }
  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        )

        const { changes, latestVersion } = response.data
    
       
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users
        await api.post('/users/sync', user)
      }
    })
  }

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()

        if (isMounted) {
          setCars(cars)
        }
      } catch (error) {
        console.log(error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCars()
    return () => {
      isMounted = false
    }
  }, []);
  useEffect( ()=>{
    if(netInfo.isConnected === true){
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);
 
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
             {
                !loading && 
                <TotalCars>
                    Total de {cars.length} carros
                </TotalCars>
            }
          </HeaderContent>
           
        </Header>

        <ContentWrapper style = {{
          marginTop: loading? 200: 0,
          marginLeft: loading? 38: 0
        }}>
        {loading? <LoadAnimation/> :<CarList
          data={cars}
          keyExtractor = { item => String(item.id)}
          renderItem={ ({item}) => <Car data={item}  onPress={()=>handleCarDetails(item)}/> }
          />}
        </ContentWrapper>
        {/* <PanGestureHandler
          onGestureEvent={onGestureEvent}
        >
          <Animated.View
            style ={[
              myCarsButtonStyled,
              {
                position: 'absolute',
                bottom: 13,
                right: 22
              }
            ]}
          >
            <ButtonAnimated
            onPress={handleOpenMyCars}
            style = {[styles.button, {backgroundColor: theme.colors.main}]}
            >
              <Ionicons
                name='ios-car-sport'
                size = {32}
                color = {theme.colors.shape}
              />
            </ButtonAnimated>
          </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
})