import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    padding:0 24px;
    background-color: ${({ theme}) => theme.colors.background_primary};
    margin-top: -125px;
`;

export const Header = styled.View`
    width: 100%;
    margin-top: ${getStatusBarHeight() + 115}px; 
`;
export const Bullets = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`;
export const Title = styled.Text`
    font-size: ${RFValue(40)};
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
`;
export const SubTitle = styled.Text`
    font-size: ${RFValue(15)};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${RFValue((25))}px;
    margin-top: 16px;
`;
export const Form = styled.View`
    width: 100%;
    margin: 64px 0;
`;
export const FormTitle = styled.Text`
    font-size: ${RFValue(20)};
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-bottom: 24px;
`;

export const Footer = styled.View``;