import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { useTheme } from 'styled-components/native'

import { useNavigation, useRoute } from '@react-navigation/native'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'
import { ImageSlider } from '../../components/ImageSlider'
import { CarDTO as Car} from '../../dtos/CarDTO';

import { getAccesoryIcon } from '../../utils/getAccesoryIcon'
import {
  About,
  AccessoriesContainer,
  Brand,
  CarImages,
  Container,
  Description,
  Details,
  Footer,
  Header,
  Name,
  Period,
  Price,
  Rent,
  ButtonBack,
  OfflineInfo
} from './styles'
import { useNetInfo } from '@react-native-community/netinfo'
import { api } from '../../services/api'

interface Params {
  car: Car
}

export function CarDetails() {
  const theme = useTheme()
  const { goBack, navigate } = useNavigation()
  const [ carUpdated, setCarUpdated] = useState<Car>({} as Car);
  const netInfo = useNetInfo();

  const route = useRoute()
  const { car } = route.params as Params
 

  function handleSchedule() {
    navigate('Schedule', { car })
  }

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 70], Extrapolate.CLAMP)
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP)
    }
  })
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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <Header>
            <ButtonBack> 
                <BackButton
                    color = {theme.colors.header}
                    onPress={goBack}/>
            </ButtonBack>    
        </Header>
        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrls={
              !! carUpdated.photos?
              carUpdated.photos
              :
              [{id: String(Math.random()) ,photo: carUpdated.thumbnail}]
            } />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{carUpdated.brand}</Brand>
            <Name>{carUpdated.name}</Name>
          </Description>

          <Rent>
            <Period>{carUpdated.period}</Period>
            <Price>R$ { netInfo.isConnected === true? carUpdated.price: '...'}</Price>
          </Rent>
        </Details>
        <AccessoriesContainer>
          {carUpdated.accessories && carUpdated.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccesoryIcon(accessory.type)}
            />
          ))
        }
        </AccessoriesContainer>
        <About>{carUpdated.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleSchedule}
          enabled={netInfo.isConnected === true}
        />
        {
          netInfo.isConnected ===false && 
          <OfflineInfo>
            Conecte-se à internet para ver mais detalhes {'\n'} e agendar seu carro.
          </OfflineInfo>
        }
      </Footer>
    </Container>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  }
})