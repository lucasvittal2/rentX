

import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Schedule } from '../screens/Schedule';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';

const {Navigator, Screen} = createStackNavigator();


export function StackRoutes(){
    return(
        <Navigator
            headerMode='none'
            initialRouteName = "SignIn"
        >
            {/* <Screen
                name="Splash"
                component= {Splash}
            /> */}
            <Screen
                name="SignIn"
                component= {SignIn}
                options={{
                    gestureEnabled: false
                }}
            />
            <Screen
                name="Home"
                component= {Home}
                options={{
                    gestureEnabled: false
                }}
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
                name="ScheduleComplete"
                component= {SchedulingComplete}
            />
           
        </Navigator>
    )
}