import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard

 } from 'react-native';
import { Feather } from '@expo/vector-icons';


import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { useAuth} from '../../hook/auth';


import{
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section
} from './styles';
import  ImagePicker from 'expo-image-picker';
import { PasswordInput } from '../../components/PasswordInput';

export function Profile(){
    const { user } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();
    const [option, setOption ] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    function handleBack(){
    navigation.goBack();
    }
    function handleSignOut(){

    }
    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
        setOption(optionSelected);
    }
    async function handleSelectAvatar(){
        const result = await  ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if(result.cancelled){
            return;
        }
        if(result.uri){
            setAvatar(result.uri);
        }
    }
    return ( 
        <KeyboardAvoidingView
            behavior = 'position'
            enabled
        >
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                    <Container>
                        <Header>
                            <HeaderTop>
                                <BackButton color = {theme.colors.shape}  onPress = {handleBack}/>
                                <HeaderTitle> Editar Perfil </HeaderTitle>
                                <LogoutButton onPress = {handleSignOut}>
                                    <Feather
                                        name= 'power'
                                        size = {24}
                                        color = {theme.colors.shape}
                                    />
                                </LogoutButton>
                            </HeaderTop>
                            <PhotoContainer>
                                <Photo source = {{uri: 'https://avatars.githubusercontent.com/u/62555057?v=4'}} />
                                <PhotoButton onPress = { handleSelectAvatar }>
                                    <Feather
                                        name= 'camera'
                                        size = { 24 }
                                        color = { theme.colors.shape}
                                    />
                                </PhotoButton>
                            </PhotoContainer>
                        </Header>
                        <Content style ={{ marginBottom: useBottomTabBarHeight()}}>
                            <Options>
                                <Option 
                                    active = { option === 'dataEdit' }
                                    onPressOut = {() => handleOptionChange('dataEdit')}
                                >
                                    <OptionTitle active = { option ==='dataEdit' }>
                                        Dados
                                    </OptionTitle>
                                </Option>
                                <Option 
                                    active = { option =='passwordEdit' }
                                    onPress = {() => handleOptionChange('passwordEdit')}
                                >
                                    <OptionTitle active = { option =='passwordEdit' }>
                                        Trocar Senha
                                    </OptionTitle>
                                </Option>
                            </Options>
                            {
                                option === 'dataEdit'?
                                <Section>
                                    <Input
                                        iconName = 'user'
                                        placeholder="Nome"
                                        autoCapitalize = 'none'
                                        autoCorrect = { false }
                                        defaultValue = { user.name}
                                        onChangeText = { setName }

                                    />
                                    <Input
                                        iconName = 'mail'
                                        editable = { false }
                                        defaultValue = { user.email }
                                        
                                    />
                                    <Input
                                        iconName = 'credit-card'
                                        keyboardType = 'numeric'
                                        placeholder = "CNH"
                                        defaultValue = { user.driver_license}
                                        onChangeText = { setDriverLicense }
                                         
                                    />
                                </Section>
                                :
                                <Section>
                            <PasswordInput
                                iconName = 'lock'
                                placeholder="Senha atual"
                                autoCapitalize = 'none'
                            />
                            <PasswordInput
                                iconName = 'lock'
                                placeholder="Nova senha"
                                autoCapitalize = 'none'
                            />
                            <PasswordInput
                                iconName = 'lock'
                                placeholder="Repitir senha"
                                autoCapitalize = 'none'
                            />
                            

                        </Section>
                            }
                        </Content>
                      
                    </Container>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
}