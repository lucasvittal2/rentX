

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';


import  {StackAppRoutes} from './app.stack.routes';

const {Navigator, Screen} = createBottomTabNavigator();

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

export function StackTabRoutes(){
    const theme = useTheme();
    return(
        <Navigator
            initialRouteName = "Home"
            tabBarOptions = {{
                activeTintColor: theme.colors.main,
                inactiveTintColor: theme.colors.text_detail,
                showLabel: false,
                style: {
                    paddingVertical: Platform.OS =="ios"? 20: 0,
                    height: 78,
                    backgroundColor: theme.colors.background_secondary
                }
            }}
        >
            <Screen
                name="Home"
                component= { StackAppRoutes }
                options = {{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg width= {24} height={24}  fill={color} />
                    )
                }}
            />
             <Screen
                name="MyCars"
                component= {MyCars}
                options = {{
                    tabBarIcon: ({ color }) => (
                        <CarSvg width= {24} height={24}  fill={color} />
                    )
                }}
            />
              <Screen
                name="Profile"
                component= { Profile }
                options = {{
                    tabBarIcon: ({ color }) => (
                        <PeopleSvg width= {24} height={24} fill={color} />
                    )
                }}
            />
            
            
        </Navigator>
    )
}