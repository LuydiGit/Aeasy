import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
//import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { Text } from 'react-native';

import BarberLogo from '../../assets/barber.svg';


export default () => {

    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token) { //Validar token

            } else {
                navigation.navigate('SignIn');
            }
        } 
        checkToken();
    }, []);

    return (
        <Container>
            <BarberLogo width= "100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
            <Text 
            style={{fontWeight: 'bold',fontSize: 12, color: "#fff", marginTop:20}}>Bem Vindo!</Text>
        </Container>
    );
}