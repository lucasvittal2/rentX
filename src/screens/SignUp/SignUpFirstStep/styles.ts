import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    margin-top: -80px;
    padding: 0px 24px;
    background-color: ${({ theme}) => theme.colors.background_primary};
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
    margin-top: 60px;
    margin-bottom: 5px;
`;
export const SubTitle = styled.Text`
    font-size: ${RFValue(15)};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    line-height: ${RFValue((25))}px;
    margin-top: 10px;
`;
export const Form = styled.View`
    width: 100%;
    margin: 44px 0;
    margin-bottom: 5px;
`;
export const FormTitle = styled.Text`
    font-size: ${RFValue(20)};
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-bottom: 24px;
`;

export const Footer = styled.View`
`;