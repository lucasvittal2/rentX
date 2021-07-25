import React from 'react';
import LottieView from  'lottie-react-native';
import loadingCar from '../../assets/loadingCar.json';

import{
  Container
} from './styles';
import { useTheme } from 'styled-components';

export function LoadAnimation(){
    const theme = useTheme();
 return ( 
    <Container>
        <LottieView
           source = {require('../../assets/loadingCar.json')}
           style={{
            height: 200
          }}
          autoPlay
          resizeMode = 'contain'
          loop
        />

    </Container>
  );
}