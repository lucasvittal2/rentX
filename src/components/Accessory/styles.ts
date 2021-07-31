import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: ${RFValue(112)}px;
    height: ${RFValue(102)}px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background_primary};
    margin-right:-10px;
    margin-bottom: 3px;
`;
export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.primary_500};
    color: ${({theme}) => theme.colors.text};
    font-size: ${RFValue(13)}px;

`;