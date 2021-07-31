

import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Schedule } from '../screens/Schedule';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';



const {Navigator, Screen} = createStackNavigator();


export function StackAppRoutes(){
    return(
        <Navigator
            headerMode='none'
            initialRouteName = "Home"
        >
            {/* <Screen
                name="Splash"
                component= {Splash}
            /> */}
            <Screen
                name="Home"
                component= {Home}
            />
             <Screen
                name="MyCars"
                component= {MyCars}
            />
            <Screen
                name="CarDetails"
                component= {CarDetails}
            />
            <Screen
                name="Schedule"
                component= {Schedule}
            />
            <Screen
                name="ScheduleDetails"
                component= {SchedulingDetails}
            />
            <Screen
                name="Confirmation"
                component= {Confirmation}
            />
           
        </Navigator>
    )
}