import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../../../firebaseConfig.js"

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import SignInput from '../../components/SignInput';


import BarberLogo from '../../assets/barber.svg';
//import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    function handleSignUp(t){
        t.preventDefault();
        createUserWithEmailAndPassword(email, password);

    }

    if (error) {
        return (
          <div>
            <Text>Error: {error.message}</Text>
          </div>
        );
      }

    if (loading) {
        return <Text>carregando...</Text>;
    }

    const navigation = useNavigation();

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    /*const handleSignClick = () => {
        navigation.reset({
            routes: [{name: 'MainTab'}]
        });
    }*/

    return (
        <Container>
            <BarberLogo width= "100%" height="100" />
            <Text 
            style={{fontWeight: 'bold',fontSize: 20, color: "#fff", marginTop:20}}>Bem Vindo</Text>
            <Text 
            style={{fontWeight: 'bold',fontSize: 12, color: "#fff", marginTop:5}}>Cadastre-se</Text>
            
            <InputArea>


            <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Endereço de e-mail" 
                    onChangeText={t=>setEmail(t)}
                    //onChange={(e) => setEmail(e.target,value)}
                
                />

            <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    password={true}
                    onChangeText={t=>setPassword(t)}
                    //onChange={(e) => setPassword(e.target,value)}               
                />

                <CustomButton onPress={handleSignUp}>
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