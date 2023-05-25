import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

import BarberLogo from '../../assets/barber.svg';

import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
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
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      function handleSignIn(t){
        t.preventDefault();
        signInWithEmailAndPassword(email, password); 
    }

    if (loading) {
        return <Text>carregando...</Text>;
    }

      
    const navigation = useNavigation();
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
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
            style={{fontWeight: 'bold',fontSize: 12, color: "#fff", marginTop:5}}>Faça login</Text>
            
            <InputArea>
            <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Endereço de e-mail"
                    onChangeText={t=>setEmail(t)}
                    //value={email}
                    //onChange={(e) => setEmail(e.target,value)}
                />

            <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    password={true}
                    onChangeText={t=>setPassword(t)}      
                   // value={password}
                   //onChange={(e) => setPassword(e.target,value)}        
                />

                <CustomButton onPress={handleSignIn}>
                    <CustomButtonText>ENTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Não possui conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Crie uma agora!</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}