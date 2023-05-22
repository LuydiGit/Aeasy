import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import BarberLogo from '../../assets/barber.svg';
import PersonIcon from '../../assets/person.svg';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != '') {

            let json = await Api.signIn(emailField, passwordField);

            if(json.token) {
                await AsyncStorage.setItem('token', json.token);

                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes:[{name:'MainTab'}]
                });
            } else {
                alert('E-mail e/ou senha errados!');
            }

        } else {
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <BarberLogo width= "100%" height="100" />
            <Text 
            style={{fontWeight: 'bold',fontSize: 20, color: "#fff", marginTop:20}}>Bem Vindo</Text>
            <Text 
            style={{fontWeight: 'bold',fontSize: 12, color: "#fff", marginTop:5}}>Faça login</Text>
            
            <InputArea>

            <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={emailField}
                   onChangeText={t=>setEmailField(t)}
                
                />

            <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Endereço de e-mail"
                    value={nameField}
                   onChangeText={t=>setNameField(t)}
                
                />

            <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}s                
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já tem uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login!</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}