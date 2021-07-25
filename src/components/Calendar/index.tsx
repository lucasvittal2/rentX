import React from 'react';
import {Feather} from '@expo/vector-icons';
import {
    Calendar as CustomCalendar,
    LocaleConfig,
    DateCallbackHandler
} from 'react-native-calendars';

import { useTheme } from 'styled-components';
import theme from '../../styles/theme';

import { ptBr } from './locale.config';
import {generateInterval} from './generateInterval';

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale ='pt-br';


interface MarkedDatesProps {
    [date: string]: { 
        color:string;
        textColor: string;
        disabled?: boolean;
        disabledTouchableEvent?: boolean;
     }
};
interface DayProps {
    dateString: string;
    day: number;
    month: number;
    timestamp: number;
    year: number;
}
interface CalendarProps{
    markedDates: MarkedDatesProps;
    onDayPress: DateCallbackHandler;
}
function Calendar({markedDates, onDayPress}: CalendarProps){
    const theme = useTheme();
 return ( 
    <CustomCalendar
        renderArrow={(direction) => 
            <Feather
                size={24}
                color = {theme.colors.shape}
                name = {direction === 'left' ? 'chevron-left': 'chevron-right'}  
            />   
        }
        headerStyle ={{
            backgroundColor: theme.colors.background_secondary,
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.text_detail,
            paddingBottom: 10,
            marginBottom: 10,
        }}
        theme = {{
            textDayFontFamily: theme.fonts.primary_400,
            textDayHeaderFontFamily: theme.fonts.primary_400,
            textDayHeaderFontSize: 10,
            textMonthFontFamily: theme.fonts.secondary_600,
            textMonthFontSize: 20,
            monthTextColor: theme.colors.title,
            arrowStyle: {
                marginHorizontal: -15
            }
        }}
        firstDay ={1}
        minDate={new Date()}
        markingType='period'
        markedDates = { markedDates }
        onDayPress = { onDayPress }
    />
  );
}

export {
    Calendar,
    MarkedDatesProps,
    DayProps,
    generateInterval
}