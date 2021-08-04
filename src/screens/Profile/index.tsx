import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert

 } from 'react-native';
import { Feather } from '@expo/vector-icons';


import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { useAuth} from '../../hook/auth';

import * as Yup from 'yup';


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
import * as ImagePicker from 'expo-image-picker';
import { PasswordInput } from '../../components/PasswordInput';
import { useNetInfo } from '@react-native-community/netinfo';

export function Profile(){
    const { user, signOut, updateUser } = useAuth();
    const theme = useTheme();
    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const [option, setOption ] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    function handleBack(){
    navigation.goBack();
    }
    function handleSignOut(){
        Alert.alert(
            'Tem certeza que deseja sair?',
            'se você sair precisará de internet para conecta-se novamente',
            [
                {
                    text: 'Cancelar',
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "Sair",
                    onPress: () => signOut()
                }
            ]
        );
        
    }
    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
        if(netInfo.isConnected  === false && optionSelected === 'passwordEdit'){
            Alert.alert('Você está Offline','Para mudar a senha conecte-se à internet');
            
        }
        else{
            setOption(optionSelected);
        }
    }
    async function handleSelectAvatar(){
        const result = await  ImagePicker.launchImageLibraryAsync({
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
    async function handleProfileUpdate(){
        try{
            const schema =  Yup.object().shape({
                driverLicense: Yup.string()
                .required('CNH é obrigatório'),
                name: Yup.string().required('Nome é obrigatório'),

            });
            const data  = { name, driverLicense};
            await schema.validate(data);
            await updateUser({
                id: user.id,
                user_id: user.user_id,
                name,
                email: user.email,
                driver_license: driverLicense,
                avatar,
                token: user.token
            });
            Alert.alert('Perfil atualizado');
        }catch(error){
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa', error.message);
            }
            else{
                Alert.alert("Não foi possível atualizar o perfil" );
                console.log(error);
            }
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
                                  <Photo source = {{uri: avatar}} />
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
                            <Button 
                                title="Salvar alterações"
                                onPress={handleProfileUpdate}
                            />
                        </Content>
                      
                    </Container>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
}