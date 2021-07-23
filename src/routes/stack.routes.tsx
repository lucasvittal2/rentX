

import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Schedule } from '../screens/Schedule';
import { SchedulingComplete } from '../screens/SchedulingComplete';

const {Navigator, Screen} = createStackNavigator();


export function StackRoutes(){
    return(
        <Navigator
            headerMode='none'
        >
            <Screen
                name="Home"
                component= {Home}
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