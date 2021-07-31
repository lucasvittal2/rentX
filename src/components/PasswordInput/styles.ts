import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import {TextInput} from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props {
    isFocused: boolean;
}
export const Container = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
    background-color: ${({ theme}) => theme.colors.background_secondary};
    
`;
export const IconContainer = styled.View<Props>`
    width: 55px;
    height: 56px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme}) => theme.colors.background_secondary};
    margin-right: 2px;
    ${({ isFocused, theme }) => isFocused  && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    ` }
`;
export const  InputText = styled(TextInput)<Props>`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_secondary};
    color: ${({ theme}) => theme.colors.text};
    font-family: ${({theme})=> theme.fonts.primary_400};
    font-size: ${RFValue(15)};
    padding: 0 23px;
    ${({ isFocused, theme }) => isFocused  && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    ` }
`;
