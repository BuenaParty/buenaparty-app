import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import FormBox from '../components/FormBox';
import GradientButtonM from '../components/GradientButtonM';
import styles from '../../assets/styles/styles';

interface ForgotPasswordProps {
  onClose: () => void;
}

const { width } = Dimensions.get('screen');

const urlAPI = 'http://localhost:3000';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
        if (!email) {
            console.error('E-mail não fornecido.');
            return;
        }

        await axios.post(`${urlAPI}/user/forgot-password`, { e_mail: email });

        console.log('Email para resetar a senha enviado com sucesso');
    } catch (error) {
        console.error('Erro ao enviar email para resetar a senha:', error);
    }
};


  return (
    <View style={style.modalContainer}>
      <View style={style.modalHeader}>
        <TouchableOpacity onPress={onClose}>
          <Text style={style.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <Text style={style.modalTitle}>Esqueceu a senha?</Text>
      <FormBox
        style={{
            formBox: {
                width: width - 40,
                height: 40,
                marginBottom: 20,
            }
        }}
        colors={[]}
        placeholder="Digite seu email"
        iconSource={require('../../assets/icons/email.png')}
        value={email}
        onChange={(text) => setEmail(text)}
      />
      <GradientButtonM style={style.button} colors={[]} onPress={handleForgotPassword}>
        <Text style={style.buttonText}>Enviar email de redefinição</Text>
      </GradientButtonM>
    </View>
  );
};

const style = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
      },
      modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginBottom: 10,
      },
      closeButton: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      modalTitle: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
      },
      input: {
        width: width - 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      button: {
        width: width - 40,
        height: 40,
        backgroundColor: 'blue', // Adjust the color as needed
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    });

export default ForgotPassword;