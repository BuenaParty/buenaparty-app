import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, TextInput, Image, TextStyle, ViewStyle } from 'react-native';
import styles from '../../assets/styles/styles';
import { TextInputMask } from 'react-native-masked-text';

interface FormBoxProps {
  colors?: string[];
  style?: {
    formBox?: ViewStyle;
    formBoxTextInput?: TextStyle;
    imageFormBox?: ViewStyle;
    formBoxBorder?: ViewStyle;
  };
  placeholder?: string;
  children?: React.ReactNode;
  iconSource: { uri: string } | number;
  onChange: (value: string) => void; // Atualizado para receber o valor como argumento
  value: string;
  type?: string | undefined;
  maskType?: string; // Tipo de máscara (por exemplo, 'cel-phone', 'cpf', 'custom', etc.)
  maskOptions?: any; // Opções de máscara específicas, se necessário
}

const FormBox: React.FC<FormBoxProps> = ({ colors, style, placeholder, children, iconSource, onChange, value, type, maskType, maskOptions }) => {

  const handleInputChange = (text: string) => {
    onChange(text); // Chama a função onChange passando o valor do campo de entrada
  };

  return (
    <LinearGradient colors={["#A12577", "#42286C"]} style={[styles.formBoxBorder]}> 
      {children}
      <View style={styles.formBox}>
        <Image style={styles.imageFormBox} source={iconSource}/>
          {maskType === 'custom' ? (
            <TextInputMask
              type={'custom'}
              options={maskOptions || {}}
              style={style?.formBoxTextInput || styles.formBoxTextInput}
              placeholder={placeholder}
              onChangeText={handleInputChange}
              value={value}
            />
          ) : maskType === 'date' ? (
            <TextInputMask
              type={'datetime'}
              options={{ format: 'DD-MM-YYYY' }}
              style={style?.formBoxTextInput || styles.formBoxTextInput}
              placeholder={placeholder}
              onChangeText={handleInputChange}
              value={value}
            />
          ) : maskType === 'time' ? (
            <TextInputMask
              type={'datetime'}
              options={{ format: 'HH:mm' }}
              style={style?.formBoxTextInput || styles.formBoxTextInput}
              placeholder={placeholder}
              onChangeText={handleInputChange}
              value={value}
            />
          ) : maskType === 'cel-phone' ? (
            <TextInputMask
              type={'cel-phone'}
              style={style?.formBoxTextInput || styles.formBoxTextInput}
              placeholder={placeholder}
              onChangeText={handleInputChange}
              value={value}
            />
          ) : (
            <TextInput
              style={style?.formBoxTextInput || styles.formBoxTextInput}
              placeholder={placeholder}
              onChangeText={handleInputChange}
              value={value}
              secureTextEntry={type === 'password'}
            />
          )}
      </View>
    </LinearGradient>
  );
};

export default FormBox;
