import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';





 
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
import { useNavigation } from '@react-navigation/native';

export function CarDetails(){
    const navigation = useNavigation();
    function hadleConfirmRental(){
        navigation.navigate('Schedule');
    }
 return ( 
    <Container>
        <Header>
            <BackButton color = '' onPress={()=>navigation.goBack()}/>
        </Header>
        <CarImages>
            <ImageSlider imageUrl= {['https://w7.pngwing.com/pngs/444/585/png-transparent-2018-audi-tt-rs-car-audi-rs5-coupe-audi-compact-car-car-performance-car.png']}/>
        </CarImages>
        <Content>
            <Details>
                <Description>
                    <Brand>Lanboguini</Brand>
                    <Name>Huracan</Name>
                </Description>
                <Rent>
                    <Period> ao dia </Period>
                    <Price> R$ 580,00</Price>
                </Rent>
            </Details>
            <Accessories>

                <Accessory name = "380km/H" icon={speedSvg} />
                <Accessory name = "3.2s" icon={accelerationSvg} />
                <Accessory name = "800Hp" icon={forceSvg}/>
                <Accessory name = "Gasolina" icon={gasolineSvg} />
                <Accessory name = "Auto" icon={exchangeSvg} />
                <Accessory name = "2 Pessoas" icon={peopleSvg}/>




                
            </Accessories>
            <About>
                Este é automóvel desportivo. Sugiu do lendário
                touro lide indultado 
                na praça Real Maestranza de Sevilla. 
                É um belíssimo carro para quem gosta de acelerar. 
                bla bla bla bla bla bla bla bla bla
                bla bla  bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla


            </About>
        </Content>
        <Footer>
            <Button title = "Escolher Período do Aluguel" onPress={hadleConfirmRental}/>
        </Footer>
    </Container>
  );
}